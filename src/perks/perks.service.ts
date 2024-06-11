import { BadRequestException, Injectable } from '@nestjs/common';
import * as perkData from '../__data/perks.json';
import { Perk, Role } from 'src/__types/general';
import { formatPerkName } from 'src/__util/functions';

@Injectable()
export class PerksService {
  private readonly allPerks = [...perkData.killer, ...perkData.survivor];
  private readonly survivorPerks = [...perkData.survivor];
  private readonly killerPerks = [...perkData.killer];

  async getAllPerks(role: Role): Promise<Perk[]> {
    if (!role) {
      return this.allPerks;
    }
    return role === 'killer' ? this.killerPerks : this.survivorPerks;
  }

  async getPerkData(name: string): Promise<Perk[]> {
    const formattedPerkName: string = formatPerkName(name);

    const perk: Perk | undefined = this.allPerks.find(
      (perk) => formatPerkName(perk.name) === formattedPerkName,
    );

    if (!perk) {
      throw new BadRequestException(`Couldn't find the given perk: '${name}'`);
    }

    return [perk];
  }

  async getRandomPerks(role: Role, amount: number = 4): Promise<Perk[]> {
    if (!role) {
      const randomPerks = [];
      for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * this.allPerks.length);
        const randomPerk = this.allPerks[randomIndex];
        randomPerks.push(randomPerk);
        this.allPerks.splice(randomIndex, 1);
      }
      return randomPerks;
    }

    // TODO: Move this to a better place
    const validRoles = ['killer', 'survivor'];

    if (!validRoles.includes(role)) {
      throw new BadRequestException();
    }

    const isKiller = role === 'killer';

    const allRolePerks = isKiller
      ? [...this.killerPerks]
      : [...this.survivorPerks];

    const randomPerks: Perk[] = [];
    for (let i = 0; i < amount; i++) {
      if (allRolePerks.length <= 0) {
        break;
      }

      const randomIndex = Math.floor(Math.random() * allRolePerks.length);
      randomPerks.push(allRolePerks[randomIndex]);
      allRolePerks.splice(randomIndex, 1);
    }

    return randomPerks;
  }
}
