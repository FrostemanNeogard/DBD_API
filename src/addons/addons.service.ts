import { BadRequestException, Injectable } from '@nestjs/common';
import * as addonData from '../__data/addons.json';
import { Addon, Role } from 'src/__types/general';
import {
  formatPerkName as formatAddonName,
  formatOwnerName,
} from 'src/__util/functions';

@Injectable()
export class AddonsService {
  private readonly allAddons = [...addonData.killer, ...addonData.survivor];
  private readonly survivorAddons = [...addonData.survivor];
  private readonly killerAddons = [...addonData.killer];

  // Returns all addons based on role (killer/survivor/all)
  async getAllAddons(role: Role) {
    if (!role) {
      return this.allAddons;
    }
    return role === 'killer' ? this.killerAddons : this.survivorAddons;
  }

  async getAddonData(owner: string, name?: string): Promise<Addon | Addon[]> {
    // Format the owner name, too
    const formattedOwnerName: string = formatOwnerName(owner);

    // Filter through all owners to find the given one...
    const ownerData = this.allAddons.find(
      (owner) => formatOwnerName(owner.name) === formattedOwnerName,
    );

    // Throw error if no owner was found
    if (!ownerData) {
      throw new BadRequestException(`Owner not found: "${owner}"`);
    }

    // If no addon name was provided, return all the owner's addons
    if (!name) {
      return ownerData.addons;
    }

    // Format addon name to improve leniency when parsing all perks
    const formattedAddonName: string = formatAddonName(name);

    // ...afterwards, filter through the owners addons to find the given one by name
    const addon = ownerData.addons.find(
      (addon) => formatAddonName(addon.name) === formattedAddonName,
    );

    // If no addon was found, throw a 400 error...
    if (!addon) {
      throw new BadRequestException(`Couldn't find the given addon: '${name}'`);
    }

    // ...otherwise, return the addon data
    return addon;
  }

  async getRandomAddons(owner: string, amount: number = 2) {
    // Throw 400 error if no addon owner was provided
    if (!owner) {
      throw new BadRequestException(`No addon owner was provided.`);
    }

    const formattedOwnerName = formatOwnerName(owner);
    const ownerData = this.allAddons.find(
      (owner) => formatOwnerName(owner.name) === formattedOwnerName,
    );
    const ownerAddons: Addon[] = [...ownerData.addons];

    // Throw 400 error if no owner was found with the given name
    if (!ownerData) {
      throw new BadRequestException(`Couldn't find addon owner: "${owner}"`);
    }

    // Loop through the "amount" variable, and fetch a random addon that many times
    const randomAddons: Addon[] = [];
    for (let i = 0; i < amount; i++) {
      // Ensure there are still remaining addons to fetch from
      if (ownerAddons.length <= 0) {
        break;
      }

      // Get a random entry from all addons for the specified owner, then remove that entry from allOwnerAddons
      const randomIndex = Math.floor(Math.random() * ownerAddons.length);
      randomAddons.push(ownerAddons[randomIndex]);
      ownerAddons.splice(randomIndex, 1);
    }

    // Finally, return the randomAddons array
    return randomAddons;
  }
}
