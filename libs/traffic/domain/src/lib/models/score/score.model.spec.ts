import { Score } from './score.model';

describe('Score', () => {
  it('should format score', () => {
    const score = new Score(1, 2);
    const scoreString = score.toString();
    expect(scoreString).toEqual('1:2');
  });
});
