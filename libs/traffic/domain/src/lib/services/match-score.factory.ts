import { Injectable } from '@nestjs/common';
import { InvalidScoreInputException } from '../exceptions/invalid-score-input.exception';
import { MatchScore } from '../models/score/match-score.model';
import { Score } from '../models/score/score.model';

@Injectable()
export class MatchScoreFactory {
  public parseString(score: unknown, firstAsMain = true): MatchScore {
    if (typeof score === 'string') {
      const scores = this.parseCommas(score);
      const mainScore = (firstAsMain && scores.shift()) || null;
      return new MatchScore(mainScore, scores);
    }
    throw new InvalidScoreInputException(score);
  }

  public parseArray(score: unknown, firstAsMain = true): MatchScore {
    if (Array.isArray(score)) {
      const scores = score.flat().map((score) => {
        if (typeof score === 'string') return this.parseScore(score);
        else throw new InvalidScoreInputException(score);
      });
      const mainScore = (firstAsMain && scores.shift()) || null;
      return new MatchScore(mainScore, scores);
    }
    throw new InvalidScoreInputException(score);
  }

  private parseCommas(scores: string): Score[] {
    return scores.split(',').map((score) => this.parseScore(score));
  }

  private parseScore(score: string): Score {
    const parts = score.split(':');
    const p1 = parseInt(parts[0]);
    const p2 = parseInt(parts[1]);

    if (isNaN(p1) || isNaN(p2)) throw new InvalidScoreInputException(score);

    return new Score(p1, p2);
  }
}
