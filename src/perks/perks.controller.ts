import { Controller, Get, Query } from '@nestjs/common';
import { PerksService } from './perks.service';
import { Perk, Role } from 'src/__types/general';

@Controller('perks')
export class PerksController {
  constructor(private readonly perksService: PerksService) {}

  @Get()
  async getPerk(
    @Query('role') role?: Role,
    @Query('name') name?: string,
  ): Promise<Perk[]> {
    if (!role) {
      return await this.perksService.getPerkData(name);
    }
    return await this.perksService.getAllPerks(role);
  }

  @Get('/random')
  async getRandomPerks(
    @Query('role') role?: Role,
    @Query('amount') amount?: number,
  ): Promise<Perk[]> {
    return await this.perksService.getRandomPerks(role, amount);
  }
}
