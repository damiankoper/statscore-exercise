import { Injectable } from '@nestjs/common';
import {
  MatchEventFactory,
  MatchEventSummary,
} from '@statscore-exercise/traffic-domain';

@Injectable()
export class IngressService {
  constructor(private readonly matchEventFactory: MatchEventFactory) {}

  public parseOne(input: object): MatchEventSummary {
    const matchEvent = this.matchEventFactory.parse(input);
    const summary = matchEvent.getSummary();
    return summary;
  }

  public parseSafeMany(inputs: object[]): MatchEventSummary[] {
    const summaries: MatchEventSummary[] = [];
    for (const input of inputs) {
      const parseResult = this.matchEventFactory.parseSafe(input);
      if (parseResult.success) {
        const matchEvent = parseResult.data;
        const summary = matchEvent.getSummary();
        summaries.push(summary);
      }
    }
    return summaries;
  }
}
