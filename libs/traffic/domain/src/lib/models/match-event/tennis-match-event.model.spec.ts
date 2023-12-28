import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';
import { Score } from '../score/score.model';
import { TennisMatchEvent } from './tennis-match-event.model';

describe('TennisMatchEvent', () => {
  it('should compute summary', () => {
    const p1 = 'Maria Sharapova';
    const p2 = 'Serena Williams';
    const score = new MatchScore(new Score(2, 1), [
      new Score(7, 6),
      new Score(6, 3),
      new Score(6, 7),
    ]);
    const event = new TennisMatchEvent(p1, p2, score);

    // when
    const result = event.getSummary();

    // then
    expect(result).toBeInstanceOf(MatchEventSummary);
    expect(result.name).toEqual('Maria Sharapova vs Serena Williams');
    expect(result.score).toEqual(
      'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)'
    );
  });
});
