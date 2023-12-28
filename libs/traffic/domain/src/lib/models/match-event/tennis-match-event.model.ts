import { NameUtils } from '@statscore-exercise/shared-utils';
import { ScoreType } from '../../enums/score-type.enum';
import { SportType } from '../../enums/sport-type.enum';
import { MatchEvent } from '../../interfaces/match-event.interface';
import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';

export class TennisMatchEvent implements MatchEvent {
  public constructor(
    public readonly participant1: string,
    public readonly participant2: string,
    public readonly score: MatchScore
  ) {}

  getSummary(): MatchEventSummary {
    const name = NameUtils.getVsName(this.participant1, this.participant2);
    return new MatchEventSummary(name, this.score.toVerboseString());
  }

  static getSportType() {
    return SportType.Tennis;
  }

  static getScoreType() {
    return ScoreType.CommaString;
  }
}
