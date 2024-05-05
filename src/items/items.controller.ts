import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItem(@Query('name') name?: string) {
    if (!name) {
      return await this.itemsService.getAllItems();
    }
    return await this.itemsService.getItem(name);
  }

  @Get('/random')
  async getRandomItem() {
    return await this.itemsService.getRandomItem();
  }
}
