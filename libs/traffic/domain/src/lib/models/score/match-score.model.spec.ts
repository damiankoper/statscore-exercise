import { MatchScore } from './match-score.model';
import { Score } from './score.model';

describe('MatchScore', () => {
  it('should format comma score only main', () => {
    const matchScore = new MatchScore(new Score(1, 2));
    const matchScoreString = matchScore.toCommaString();
    expect(matchScoreString).toEqual('1:2');
  });

  it('should format comma score with periods', () => {
    const matchScore = new MatchScore(new Score(1, 2), [
      new Score(3, 4),
      new Score(5, 6),
    ]);
    const matchScoreString = matchScore.toCommaString();
    expect(matchScoreString).toEqual('1:2,3:4,5:6');
  });

  it('should format comma score only periods', () => {
    const matchScore = new MatchScore(null, [new Score(3, 4), new Score(5, 6)]);
    const matchScoreString = matchScore.toCommaString();
    expect(matchScoreString).toEqual('3:4,5:6');
  });

  it('should format verbose score only main', () => {
    const matchScore = new MatchScore(new Score(1, 2));
    const matchScoreString = matchScore.toVerboseString();
    expect(matchScoreString).toEqual('Main score: 1:2');
  });

  it('should format verbose score with periods', () => {
    const matchScore = new MatchScore(new Score(1, 2), [
      new Score(3, 4),
      new Score(5, 6),
    ]);
    const matchScoreString = matchScore.toVerboseString();
    expect(matchScoreString).toEqual('Main score: 1:2 (set1 3:4, set2 5:6)');
  });

  it('should format verbose score only periods', () => {
    const matchScore = new MatchScore(null, [new Score(3, 4), new Score(5, 6)]);
    const matchScoreString = matchScore.toVerboseString();
    expect(matchScoreString).toEqual('Main score: --- (set1 3:4, set2 5:6)');
  });
});
