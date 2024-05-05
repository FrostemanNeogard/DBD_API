import { Module } from '@nestjs/common';
import { KillersService } from './killers.service';
import { KillersController } from './killers.controller';

@Module({
  controllers: [KillersController],
  providers: [KillersService],
})
export class KillersModule {}
