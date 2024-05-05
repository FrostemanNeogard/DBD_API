import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { Role } from 'src/__types/general';

@Controller('addons')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Get()
  async getAllAddons(@Query('role') role?: Role) {
    return this.addonsService.getAllAddons(role);
  }

  @Get(':owner')
  async getAddonData(
    @Query('owner') owner: string,
    @Query('name') name?: string,
  ) {
    return this.addonsService.getAddonData(owner, name);
  }

  @Get(':owner/random')
  async getRandomAddon(
    @Param('owner') owner: string,
    @Query('amount') amount?: number,
  ) {
    return this.addonsService.getRandomAddons(owner, amount);
  }
}
