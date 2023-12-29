import { Test } from '@nestjs/testing';
import {
  MatchEventFactory,
  MatchEventSummary,
  MatchScoreFactory,
} from '@statscore-exercise/traffic-domain';

import { IngressService } from './ingress.service';

describe('IngressService', () => {
  let ingressService: IngressService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [IngressService, MatchEventFactory, MatchScoreFactory],
    }).compile();

    ingressService = moduleRef.get<IngressService>(IngressService);
  });

  describe('match event summary', () => {
    it('should parse array of input objects', () => {
      // given
      const input = [
        {
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
          score: '2:1',
        },
        {
          sport: 'volleyball',
          participant1: 'Germany',
          participant2: 'France',
          score: '3:0,25:23,25:19,25:21',
        },
        {
          sport: 'handball',
          participant1: 'Pogoń Szczeciń',
          participant2: 'Azoty Puławy',
          score: '34:26',
        },
        {
          sport: 'basketball',
          participant1: 'GKS Tychy',
          participant2: 'GKS Katowice',
          score: [
            ['9:7', '2:1'],
            ['5:3', '9:9'],
          ],
        },
        {
          sport: 'tennis',
          participant1: 'Maria Sharapova',
          participant2: 'Serena Williams',
          score: '2:1,7:6,6:3,6:7',
        },
        {
          sport: 'ski jumping',
        },
      ];

      // when
      const result = ingressService.parseSafeMany(input);

      // then
      expect(result).toHaveLength(5);
      expect(result).not.toEqual(
        expect.not.arrayContaining([expect.any(MatchEventSummary)])
      );
      expect(result).toEqual([
        {
          name: 'Chelsea - Arsenal',
          score: '2:1',
        },
        {
          name: 'Germany - France',
          score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
        },
        {
          name: 'Pogoń Szczeciń vs Azoty Puławy',
          score: '34:26',
        },
        {
          name: 'GKS Tychy - GKS Katowice',
          score: '9:7,2:1,5:3,9:9',
        },
        {
          name: 'Maria Sharapova vs Serena Williams',
          score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
        },
      ]);
    });
  });
});
