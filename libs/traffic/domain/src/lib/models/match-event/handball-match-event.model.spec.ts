import { MatchEventSummary } from '../match-event-summary.model';
import { MatchScore } from '../score/match-score.model';
import { Score } from '../score/score.model';
import { HandballMatchEvent } from './handball-match-event.model';

describe('HandballMatchEvent', () => {
  it('should compute summary', () => {
    const p1 = 'Pogoń Szczeciń';
    const p2 = 'Azoty Puławy';
    const score = new MatchScore(new Score(34, 26));
    const event = new HandballMatchEvent(p1, p2, score);

    // when
    const result = event.getSummary();

    // then
    expect(result).toBeInstanceOf(MatchEventSummary);
    expect(result.name).toEqual('Pogoń Szczeciń vs Azoty Puławy');
    expect(result.score).toEqual('34:26');
  });
});
