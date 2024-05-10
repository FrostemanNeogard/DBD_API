import { Controller, Get, Query } from '@nestjs/common';
import { SurvivorsService } from './survivors.service';
import { Survivor } from 'src/__types/general';

@Controller('survivors')
export class SurvivorsController {
  constructor(private readonly survivorsService: SurvivorsService) {}

  @Get()
  async getAllSurvivors(@Query('name') name?: string): Promise<Survivor[]> {
    if (!name) {
      return await this.survivorsService.getAllSurvivors();
    }
    return await this.survivorsService.getSurvivor(name);
  }

  @Get('/random')
  async getRandomSurvivor(): Promise<Survivor[]> {
    return await this.survivorsService.getRandomSurvivor();
  }
}
