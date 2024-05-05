import { BadRequestException, Injectable } from '@nestjs/common';
import * as perkData from '../__data/perks.json';
import { Perk, Role } from 'src/__types/general';
import { formatPerkName } from 'src/__util/functions';

@Injectable()
export class PerksService {
  private readonly allPerks = [...perkData.killer, ...perkData.survivor];
  private readonly survivorPerks = [...perkData.survivor];
  private readonly killerPerks = [...perkData.killer];

  // Returns all perks based on role (killer/survivor/all)
  async getAllPerks(role: Role): Promise<Perk[]> {
    if (!role) {
      return this.allPerks;
    }
    return role === 'killer' ? this.killerPerks : this.survivorPerks;
  }

  async getPerkData(name: string): Promise<Perk[]> {
    // Format perk name to improve leniency when parsing all perks
    const formattedPerkName: string = formatPerkName(name);

    // Attempt to find perk data based on the formatted perk names
    const perk: Perk | undefined = this.allPerks.find(
      (perk) => formatPerkName(perk.name) === formattedPerkName,
    );

    // If no perk was found, throw a 400 error...
    if (!perk) {
      throw new BadRequestException(`Couldn't find the given perk: '${name}'`);
    }

    // ...otherwise, return the perk data
    return [perk];
  }

  async getRandomPerks(role: Role, amount: number = 4): Promise<Perk[]> {
    // Handle random perks if no role was specified
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

    // Define valid roles
    // (TODO: Move this to a better place)
    const validRoles = ['killer', 'survivor'];

    // Handle invalid roles
    if (!validRoles.includes(role)) {
      throw new BadRequestException();
    }

    // Create boolean for is the targeted role is killer or not
    // This is used to check which perks to fetch later on
    const isKiller = role === 'killer';

    // Define perks based on the isKiller variable
    const allRolePerks = isKiller
      ? [...this.killerPerks]
      : [...this.survivorPerks];

    // Loop through the "amount" variable, and fetch a random perk that many times
    const randomPerks: Perk[] = [];
    for (let i = 0; i < amount; i++) {
      // Ensure there are still remaining perks to fetch from
      if (allRolePerks.length <= 0) {
        break;
      }

      // Get a random entry from all perks for the specified role, then remove that entry from allRolePerks
      const randomIndex = Math.floor(Math.random() * allRolePerks.length);
      randomPerks.push(allRolePerks[randomIndex]);
      allRolePerks.splice(randomIndex, 1);
    }

    // Finally, return the randomPerks array
    return randomPerks;
  }
}
