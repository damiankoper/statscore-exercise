import { Test } from '@nestjs/testing';
import {
  MatchEvent,
  MatchEventFactory,
  MatchEventSummary,
  MatchScore,
} from '@statscore-exercise/traffic-domain';

import { IngressService } from './ingress.service';

describe('IngressService', () => {
  let ingressService: IngressService;
  const matchEventFactoryMock = {
    parse: vi.fn(),
    parseSafe: vi.fn(),
  } satisfies Partial<MatchEventFactory>;

  const matchEventMock = vi.mocked<MatchEvent>({
    getSummary: vi.fn(),
    participant1: 'a',
    participant2: 'b',
    score: {} as MatchScore,
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [IngressService],
    })
      .useMocker((token) => {
        switch (token) {
          case MatchEventFactory:
            return matchEventFactoryMock;
          default:
            return null;
        }
      })
      .compile();

    ingressService = moduleRef.get<IngressService>(IngressService);
  });

  it('should be defined', () => {
    expect(ingressService).toBeInstanceOf(IngressService);
  });

  describe('match event summary', () => {
    it('should return summary object for input object', () => {
      // given
      const input = {};
      const summary = new MatchEventSummary('name', 'score');
      matchEventFactoryMock.parse.mockReturnValue(matchEventMock);
      matchEventMock.getSummary.mockReturnValue(summary);

      // when
      const result = ingressService.parseOne(input);

      // then
      expect(result).toBe(summary);
    });

    it('should return summary object for input object', () => {
      // given
      const input = [{}, {}, {}];
      const summaryA = new MatchEventSummary('name', 'score');
      const summaryB = new MatchEventSummary('name', 'score');

      matchEventFactoryMock.parseSafe.mockReturnValueOnce({
        success: true,
        data: matchEventMock,
      });
      matchEventFactoryMock.parseSafe.mockReturnValueOnce({
        success: false,
        errors: [new Error('Error')],
      });
      matchEventFactoryMock.parseSafe.mockReturnValueOnce({
        success: true,
        data: matchEventMock,
      });

      matchEventMock.getSummary.mockReturnValueOnce(summaryA);
      matchEventMock.getSummary.mockReturnValueOnce(summaryB);

      // when
      const result = ingressService.parseSafeMany(input);

      // then
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(summaryA);
      expect(result[1]).toBe(summaryB);
    });
  });
});
