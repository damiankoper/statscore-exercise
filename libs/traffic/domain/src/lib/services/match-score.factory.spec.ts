import { Score } from '../models/score/score.model';
import { MatchScoreFactory } from './match-score.factory';

describe('MatchScoreFactory', () => {
  describe('invalid input', () => {
    it('should throw exception on invalid input', () => {
      const factory = new MatchScoreFactory();

      expect(() => factory.parseString(7312)).toThrowError(
        'Invalid score input: 7312'
      );

      expect(() => factory.parseString({})).toThrowError(
        'Invalid score input: {}'
      );

      expect(() => factory.parseString('3:0,a:b')).toThrowError(
        'Invalid score input: "a:b"'
      );
    });
  });

  describe('string', () => {
    it('should parse simple string', () => {
      const factory = new MatchScoreFactory();
      const result = factory.parseString('2:1');

      expect(result.main).toBeInstanceOf(Score);
      expect(result.main).toEqual(new Score(2, 1));
      expect(result.periods).toHaveLength(0);
    });

    it('should parse string commas firstAsMain', () => {
      const factory = new MatchScoreFactory();
      const result = factory.parseString('1:2,3:4,5:6');

      expect(result.main).toBeInstanceOf(Score);
      expect(result.main).toEqual(new Score(1, 2));
      expect(result.periods).toHaveLength(2);
      result.periods.forEach((period) => {
        expect(period).toBeInstanceOf(Score);
      });
      expect(result.periods).toEqual([new Score(3, 4), new Score(5, 6)]);
    });

    it('should parse string commas not firstAsMain', () => {
      const factory = new MatchScoreFactory();
      const result = factory.parseString('1:2,3:4,5:6', false);

      expect(result.main).toBeNull();
      expect(result.periods).toHaveLength(3);
      result.periods.forEach((period) => {
        expect(period).toBeInstanceOf(Score);
      });
      expect(result.periods).toEqual([
        new Score(1, 2),
        new Score(3, 4),
        new Score(5, 6),
      ]);
    });
  });

  describe('array', () => {
    it('should parse array firstAsMain', () => {
      const factory = new MatchScoreFactory();
      const result = factory.parseArray([
        ['9:7', '2:1'],
        ['5:3', '9:9'],
      ]);

      expect(result.main).toBeInstanceOf(Score);
      expect(result.main).toEqual(new Score(9, 7));
      expect(result.periods).toHaveLength(3);
      result.periods.forEach((period) => {
        expect(period).toBeInstanceOf(Score);
      });
      expect(result.periods).toEqual([
        new Score(2, 1),
        new Score(5, 3),
        new Score(9, 9),
      ]);
    });

    it('should parse array not firstAsMain', () => {
      const factory = new MatchScoreFactory();
      const result = factory.parseArray(
        [
          ['9:7', '2:1'],
          ['5:3', '9:9'],
        ],
        false
      );

      expect(result.main).toBeNull();
      expect(result.periods).toHaveLength(4);
      result.periods.forEach((period) => {
        expect(period).toBeInstanceOf(Score);
      });
      expect(result.periods).toEqual([
        new Score(9, 7),
        new Score(2, 1),
        new Score(5, 3),
        new Score(9, 9),
      ]);
    });
  });
});
