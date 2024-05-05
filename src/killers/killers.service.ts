import { BadRequestException, Injectable } from '@nestjs/common';
import * as characterData from '../__data/characters.json';
import { Killer } from 'src/__types/general';

@Injectable()
export class KillersService {
  private readonly allKillers: Killer[] = [...characterData.killers];

  // Return all killers
  async getAllKillers() {
    return this.allKillers;
  }

  // Fetch killer data based on name input
  async getKiller(name: string): Promise<Killer[]> {
    const killerData = this.allKillers.find((killer) => killer.name == name);
    if (!killerData) {
      throw new BadRequestException(`Killer not found: "${name}"`);
    }

    return [killerData];
  }

  // Get random entry from the "allKillers" array
  async getRandomKiller(): Promise<Killer[]> {
    const randomIndex = Math.floor(Math.random() * this.allKillers.length);
    const randomKiller = this.allKillers[randomIndex];
    return [randomKiller];
  }
}
