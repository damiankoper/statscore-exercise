import { InvalidEventInputException } from '../exceptions/invalid-event-input.exception';
import { InvalidScoreInputException } from '../exceptions/invalid-score-input.exception';
import { MatchEvent } from '../interfaces/match-event.interface';
import { BasketballMatchEvent } from '../models/match-event/basketball-match-event.model';
import { HandballMatchEvent } from '../models/match-event/handball-match-event.model';
import { SoccerMatchEvent } from '../models/match-event/soccer-match-event.model';
import { TennisMatchEvent } from '../models/match-event/tennis-match-event.model';
import { VolleyballMatchEvent } from '../models/match-event/volleyball-match-event.model';
import { MatchScore } from '../models/score/match-score.model';
import { Score } from '../models/score/score.model';
import { MatchEventFactory } from './match-event.factory';
import { MatchScoreFactory } from './match-score.factory';

// ALT: auto mock from __mocks__ directory
vi.mock('./match-score.factory', () => ({
  MatchScoreFactory: vi.fn(
    () =>
      ({
        parseString: vi.fn(),
        parseArray: vi.fn(),
      } satisfies Partial<MatchScoreFactory>)
  ),
}));

// ALT: These tests are verbose on purpose assuming the domain model of the events
// ALT: will grow. They could be handled using `it.each` vitest/jest feature.
describe('MatchEventFactory', () => {
  describe('ok cases', () => {
    it('should parse soccer event', () => {
      // given
      const input = {
        sport: 'soccer',
        participant1: 'Chelsea',
        participant2: 'Arsenal',
        score: '2:1',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(new Score(2, 1));
      scoreFactory.parseString.mockReturnValue(matchScore);

      // when
      const result = factory.parse(input);

      // then
      expect(result).toBeInstanceOf(SoccerMatchEvent);
      expect(result.participant1).toEqual(input.participant1);
      expect(result.participant2).toEqual(input.participant2);
      expect(result.score).toBe(matchScore);
      expect(scoreFactory.parseString).toBeCalledTimes(1);
      expect(scoreFactory.parseString).toBeCalledWith(input.score);
    });

    it('should parse volleyball event', () => {
      // given
      const input = {
        sport: 'volleyball',
        participant1: 'Germany',
        participant2: 'France',
        score: '3:0,25:23,25:19,25:21',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(new Score(3, 0), [
        new Score(25, 23),
        new Score(25, 19),
        new Score(25, 21),
      ]);
      scoreFactory.parseString.mockReturnValue(matchScore);

      // when
      const result = factory.parse(input);

      // then
      expect(result).toBeInstanceOf(VolleyballMatchEvent);
      expect(result.participant1).toEqual(input.participant1);
      expect(result.participant2).toEqual(input.participant2);
      expect(result.score).toBe(matchScore);
      expect(scoreFactory.parseString).toBeCalledTimes(1);
      expect(scoreFactory.parseString).toBeCalledWith(input.score);
    });

    it('should parse handball event', () => {
      // given
      const input = {
        sport: 'handball',
        participant1: 'Pogoń Szczeciń',
        participant2: 'Azoty Puławy',
        score: '34:26',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(new Score(34, 26));
      scoreFactory.parseString.mockReturnValue(matchScore);

      // when
      const result = factory.parse(input);

      // then
      expect(result).toBeInstanceOf(HandballMatchEvent);
      expect(result.participant1).toEqual(input.participant1);
      expect(result.participant2).toEqual(input.participant2);
      expect(result.score).toBe(matchScore);
      expect(scoreFactory.parseString).toBeCalledTimes(1);
      expect(scoreFactory.parseString).toBeCalledWith(input.score);
    });

    it('should parse basketball event', () => {
      // given
      const input = {
        sport: 'basketball',
        participant1: 'GKS Tychy',
        participant2: 'GKS Katowice',
        score: [
          ['9:7', '2:1'],
          ['5:3', '9:9'],
        ],
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(null, [
        new Score(9, 7),
        new Score(2, 1),
        new Score(5, 3),
        new Score(9, 9),
      ]);
      scoreFactory.parseArray.mockReturnValue(matchScore);

      // when
      const result = factory.parse(input);

      // then
      expect(result).toBeInstanceOf(BasketballMatchEvent);
      expect(result.participant1).toEqual(input.participant1);
      expect(result.participant2).toEqual(input.participant2);
      expect(result.score).toBe(matchScore);
      expect(scoreFactory.parseArray).toBeCalledTimes(1);
      expect(scoreFactory.parseArray).toBeCalledWith(input.score, false);
    });

    it('should parse tennis event', () => {
      // given
      const input = {
        sport: 'tennis',
        participant1: 'Maria Sharapova',
        participant2: 'Serena Williams',
        score: '2:1,7:6,6:3,6:7',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(new Score(2, 1), [
        new Score(7, 6),
        new Score(6, 3),
        new Score(6, 7),
      ]);
      scoreFactory.parseString.mockReturnValue(matchScore);

      // when
      const result = factory.parse(input);

      // then
      expect(result).toBeInstanceOf(TennisMatchEvent);
      expect(result.participant1).toEqual(input.participant1);
      expect(result.participant2).toEqual(input.participant2);
      expect(result.score).toBe(matchScore);
      expect(scoreFactory.parseString).toBeCalledTimes(1);
      expect(scoreFactory.parseString).toBeCalledWith(input.score);
    });

    it('should parse safe', () => {
      // given
      const input = {
        sport: 'soccer',
        participant1: 'Chelsea',
        participant2: 'Arsenal',
        score: '2:1',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      const matchScore = new MatchScore(new Score(2, 1));
      scoreFactory.parseString.mockReturnValue(matchScore);

      // when
      const result = factory.parseSafe(input) as {
        success: true;
        data: MatchEvent;
      };

      // then
      expect(result.data).toBeInstanceOf(SoccerMatchEvent);
      expect(result.data.participant1).toEqual(input.participant1);
      expect(result.data.participant2).toEqual(input.participant2);
      expect(result.data.score).toBe(matchScore);
      expect(scoreFactory.parseString).toBeCalledTimes(1);
      expect(scoreFactory.parseString).toBeCalledWith(input.score);
    });
  });

  describe('exceptions', () => {
    it('should throw on invalid sport', () => {
      // given
      const input = { sport: 'ski jumping' };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      // when + then
      expect(() => factory.parse(input)).toThrowError(
        InvalidEventInputException
      );
    });

    it('should throw on invalid participants', () => {
      // given
      const input = {
        sport: 'soccer',
        participant1: '',
        participant2: '',
        score: '2:1',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      // when + then
      expect(() => factory.parse(input)).toThrowError(
        InvalidEventInputException
      );
    });

    it('should throw on invalid score', () => {
      // given
      const input = {
        sport: 'soccer',
        participant1: 'A',
        participant2: 'B',
        score: 'one:two',
      };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);
      scoreFactory.parseString.mockImplementation(() => {
        throw new InvalidScoreInputException(input.score);
      });

      // when + then
      expect(() => factory.parse(input)).toThrowError(
        InvalidScoreInputException
      );
    });

    it('should throw safe', () => {
      // given
      const input = { sport: 'ski jumping' };
      const scoreFactory = vi.mocked(new MatchScoreFactory());
      const factory = new MatchEventFactory(scoreFactory);

      // when
      const result = factory.parseSafe(input) as {
        success: false;
        errors: unknown[];
      };
      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBeInstanceOf(InvalidEventInputException);
    });
  });
});
