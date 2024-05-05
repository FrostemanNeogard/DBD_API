import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as itemData from '../__data/items.json';
import { Item } from 'src/__types/general';

@Injectable()
export class ItemsService {
  async getAllItems() {
    try {
      return itemData;
    } catch (error) {
      throw new BadGatewayException(
        'An unknown error ocurred. Please try again later.',
      );
    }
  }

  async getItem(itemName: string): Promise<Item[]> {
    const item = itemData.find((item) => item.name === itemName);

    if (!item) {
      throw new BadRequestException(`Item not found: "${itemName}"`);
    }

    return [item];
  }

  async getRandomItem(amount: number = 1) {
    // Throw error if amount is less than 1
    if (amount <= 0) {
      throw new BadRequestException(
        `The requested number of items must be at least 1.`,
      );
    }

    const randomItems = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * itemData.length);
      const randomItem = itemData[randomIndex];
      randomItems.push(randomItem);
    }
    return randomItems;
  }
}
