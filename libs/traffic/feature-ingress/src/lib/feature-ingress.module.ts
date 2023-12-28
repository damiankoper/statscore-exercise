import { Module } from '@nestjs/common';
import { FeatureIngressService } from './services/feature-ingress.service';

@Module({
  controllers: [],
  providers: [FeatureIngressService],
  exports: [FeatureIngressService],
})
export class FeatureIngressModule {}
