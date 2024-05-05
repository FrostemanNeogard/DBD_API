import { Controller, Get, Query } from '@nestjs/common';
import { PerksService } from './perks.service';
import { Role } from 'src/__types/general';

@Controller('perks')
export class PerksController {
  constructor(private readonly perksService: PerksService) {}

  @Get()
  async getPerk(@Query('name') name?: string, @Query('role') role?: Role) {
    if (!role) {
      return await this.perksService.getPerkData(name);
    }
    return await this.perksService.getAllPerks(role);
  }

  @Get('/random')
  async getRandomPerks(
    @Query('role') role?: string, // Role of the perks to be returned. Either "killer" or "survivor".
    @Query('amount') amount?: number, // Amount of perks to return data for
  ) {
    return await this.perksService.getRandomPerks(role, amount);
  }
}
