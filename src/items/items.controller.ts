import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from 'src/__types/general';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItem(@Query('name') name?: string): Promise<Item[]> {
    if (!name) {
      return await this.itemsService.getAllItems();
    }
    return await this.itemsService.getItem(name);
  }

  @Get('/random')
  async getRandomItem(): Promise<Item[]> {
    return await this.itemsService.getRandomItem();
  }
}
