import { BadRequestException, Injectable } from '@nestjs/common';
import { Survivor } from 'src/__types/general';
import * as characterData from '../__data/characters.json';

@Injectable()
export class SurvivorsService {
  private readonly allSurvivors: Survivor[] = [...characterData.survivors];

  async getAllSurvivors(): Promise<Survivor[]> {
    return this.allSurvivors;
  }

  async getSurvivor(name: string): Promise<Survivor[]> {
    const survivorData = this.allSurvivors.find(
      (survivor) => survivor.name == name,
    );
    if (!survivorData) {
      throw new BadRequestException(`Survivor not found: "${name}"`);
    }

    return [survivorData];
  }

  async getRandomSurvivor(): Promise<Survivor[]> {
    const randomIndex = Math.floor(Math.random() * this.allSurvivors.length);
    const randomSurvivor = this.allSurvivors[randomIndex];
    return [randomSurvivor];
  }
}
