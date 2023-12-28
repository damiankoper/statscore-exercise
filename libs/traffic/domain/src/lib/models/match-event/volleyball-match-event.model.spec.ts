import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';
import { Score } from '../score/score.model';
import { VolleyballMatchEvent } from './volleyball-match-event.model';

describe('VolleyballMatchEvent', () => {
  it('should compute summary', () => {
    const p1 = 'Germany';
    const p2 = 'France';
    const score = new MatchScore(new Score(2, 1), [
      new Score(7, 6),
      new Score(6, 3),
      new Score(6, 7),
    ]);
    const event = new VolleyballMatchEvent(p1, p2, score);

    // when
    const result = event.getSummary();

    // then
    expect(result).toBeInstanceOf(MatchEventSummary);
    expect(result.name).toEqual('Germany - France');
    expect(result.score).toEqual(
      'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)'
    );
  });
});
