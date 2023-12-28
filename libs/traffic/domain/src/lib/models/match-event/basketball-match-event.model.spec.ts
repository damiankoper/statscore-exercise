import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';
import { Score } from '../score/score.model';
import { BasketballMatchEvent } from './basketball-match-event.model';

describe('BasketballMatchEvent', () => {
  it('should compute summary', () => {
    const p1 = 'GKS Tychy';
    const p2 = 'GKS Katowice';
    const score = new MatchScore(null, [
      new Score(9, 7),
      new Score(2, 1),
      new Score(5, 3),
      new Score(9, 9),
    ]);
    const event = new BasketballMatchEvent(p1, p2, score);

    // when
    const result = event.getSummary();

    // then
    expect(result).toBeInstanceOf(MatchEventSummary);
    expect(result.name).toEqual('GKS Tychy - GKS Katowice');
    expect(result.score).toEqual('9:7,2:1,5:3,9:9');
  });
});
