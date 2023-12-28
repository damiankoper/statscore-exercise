import { Module } from '@nestjs/common';
import {
  MatchEventFactory,
  MatchScoreFactory,
} from '@statscore-exercise/traffic-domain';
import { ParseCommand } from './cli/parse.cli';
import { IngressService } from './services/ingress.service';

@Module({
  controllers: [],
  providers: [
    IngressService,
    MatchEventFactory,
    MatchScoreFactory,
    ParseCommand,
  ],
  exports: [ParseCommand],
})
export class IngressModule {}
