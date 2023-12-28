import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';
import { Score } from '../score/score.model';
import { SoccerMatchEvent } from './soccer-match-event.model';

describe('SoccerMatchEvent', () => {
  it('should compute summary', () => {
    const p1 = 'Chelsea';
    const p2 = 'Arsenal';
    const score = new MatchScore(new Score(2, 1));
    const event = new SoccerMatchEvent(p1, p2, score);

    // when
    const result = event.getSummary();

    // then
    expect(result).toBeInstanceOf(MatchEventSummary);
    expect(result.name).toEqual('Chelsea - Arsenal');
    expect(result.score).toEqual('2:1');
  });
});
