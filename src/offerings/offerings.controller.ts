import { Controller, Get, Query } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { Offering, Role } from 'src/__types/general';

@Controller('offerings')
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) {}

  @Get()
  async getAllOfferings(
    @Query('name') name?: string,
    @Query('role') role?: Role,
  ): Promise<Offering[]> {
    if (!name) {
      return await this.offeringsService.getAllOfferings(role);
    }
    return await this.offeringsService.getOffering(name);
  }

  @Get('/random')
  async getRandomOffering(@Query('role') role?: Role): Promise<Offering[]> {
    return await this.offeringsService.getRandomOffering(role);
  }
}
