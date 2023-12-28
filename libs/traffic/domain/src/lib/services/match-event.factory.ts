import { Injectable } from '@nestjs/common';
import { ScoreType } from '../enums/score-type.enum';
import { InvalidEventInputException } from '../exceptions/invalid-event-input.exception';
import { MatchEvent } from '../interfaces/match-event.interface';
import { ParseResult } from '../interfaces/parse-result.interface';
import { Participants } from '../interfaces/participants.interface';
import { BasketballMatchEvent } from '../models/match-event/basketball-match-event.model';
import { HandballMatchEvent } from '../models/match-event/handball-match-event.model';
import { SoccerMatchEvent } from '../models/match-event/soccer-match-event.model';
import { TennisMatchEvent } from '../models/match-event/tennis-match-event.model';
import { VolleyballMatchEvent } from '../models/match-event/volleyball-match-event.model';
import { MatchScore } from '../models/score/match-score.model';
import { MatchScoreFactory } from './match-score.factory';

/**
 * ? ALT: Instead of manual parsing, library like 'zod' could be used
 * ? ALT: to do input parsing before ValueObject creation.
 * ? ALT: I've chosen manual parsing not knowing the third-party library policy.
 *
 * * Adding new MatchEvent affects only matchEventMap
 * * Adding new score format affects only scoreTypeMap
 */
@Injectable()
export class MatchEventFactory {
  public constructor(private readonly matchScoreFactory: MatchScoreFactory) {}

  private readonly matchEventMap = {
    [SoccerMatchEvent.getSportType()]: SoccerMatchEvent,
    [HandballMatchEvent.getSportType()]: HandballMatchEvent,
    [BasketballMatchEvent.getSportType()]: BasketballMatchEvent,
    [TennisMatchEvent.getSportType()]: TennisMatchEvent,
    [VolleyballMatchEvent.getSportType()]: VolleyballMatchEvent,
  };

  private readonly scoreTypeMap = {
    [ScoreType.CommaString]: (score: unknown) =>
      this.matchScoreFactory.parseString(score),
    [ScoreType.NestedArray]: (score: unknown) =>
      this.matchScoreFactory.parseArray(score, false),
  };

  public parse(input: unknown): MatchEvent {
    const inputValid = typeof input === 'object' && input;
    if (inputValid) {
      const sport = this.parseSport(input);
      const { participant1: p1, participant2: p2 } =
        this.parseParticipants(input);
      const MatchEventConstructor = this.matchEventMap[sport];
      const scoreType = MatchEventConstructor.getScoreType();
      const score = this.parseMatchScore(input, scoreType);
      return new MatchEventConstructor(p1, p2, score);
    }
    throw new InvalidEventInputException(input);
  }

  public parseSafe(input: unknown): ParseResult<MatchEvent> {
    try {
      const matchEvent = this.parse(input);
      return { success: true, data: matchEvent };
    } catch (e) {
      const error = e instanceof Error ? e : new Error(JSON.stringify(e));
      return { success: false, errors: [error] };
    }
  }

  private parseSport(input: object): string {
    if ('sport' in input && typeof input['sport'] === 'string')
      return input['sport'];
    else throw new InvalidEventInputException(input);
  }

  private parseParticipants(input: object): Participants {
    const p1Valid =
      'participant1' in input &&
      typeof input['participant1'] === 'string' &&
      input['participant1'].length;
    const p2Valid =
      'participant2' in input &&
      typeof input['participant2'] === 'string' &&
      input['participant2'].length;
    if (p1Valid && p2Valid)
      return {
        participant1: input['participant1'] as string,
        participant2: input['participant2'] as string,
      };
    else throw new InvalidEventInputException(input);
  }

  private parseMatchScore(input: object, scoreType: ScoreType): MatchScore {
    const scoreExists = 'score' in input;
    if (scoreExists) return this.scoreTypeMap[scoreType](input.score);
    else throw new InvalidEventInputException(input);
  }
}
