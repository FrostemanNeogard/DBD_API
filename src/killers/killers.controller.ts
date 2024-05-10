import { Controller, Get, Query } from '@nestjs/common';
import { KillersService } from './killers.service';
import { Killer } from 'src/__types/general';

@Controller('killers')
export class KillersController {
  constructor(private readonly killersService: KillersService) {}

  @Get()
  async getAllKillers(@Query('name') name?: string): Promise<Killer[]> {
    if (!name) {
      return await this.killersService.getAllKillers();
    }
    return await this.killersService.getKiller(name);
  }

  @Get('/random')
  async getRandomKiller(): Promise<Killer[]> {
    return await this.killersService.getRandomKiller();
  }
}
