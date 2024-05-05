import { Module } from '@nestjs/common';
import { PerksService } from './perks.service';
import { PerksController } from './perks.controller';

@Module({
  controllers: [PerksController],
  providers: [PerksService],
})
export class PerksModule {}
