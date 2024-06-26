import { Module } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { OfferingsController } from './offerings.controller';

@Module({
  controllers: [OfferingsController],
  providers: [OfferingsService],
})
export class OfferingsModule {}
