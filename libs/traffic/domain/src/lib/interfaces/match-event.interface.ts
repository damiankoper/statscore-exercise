import { MatchEventSummary } from '../models/match-event-summary.model';
import { MatchScore } from '../models/score/match-score.model';
import { Participants } from './participants.interface';

export interface MatchEvent extends Participants {
  readonly score: MatchScore;

  getSummary(): MatchEventSummary;
}
