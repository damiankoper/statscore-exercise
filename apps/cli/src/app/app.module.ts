import { Module } from '@nestjs/common';
import { IngressModule } from '@statscore-exercise/feature-ingress';

@Module({
  imports: [IngressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
