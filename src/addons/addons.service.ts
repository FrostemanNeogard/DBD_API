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

  async getAllAddons(role: Role) {
    if (!role) {
      return this.allAddons;
    }
    return role === 'killer' ? this.killerAddons : this.survivorAddons;
  }

  async getAddonData(owner: string, name?: string): Promise<Addon | Addon[]> {
    const formattedOwnerName: string = formatOwnerName(owner);
    const ownerData = this.allAddons.find(
      (owner) => formatOwnerName(owner.name) === formattedOwnerName,
    );

    if (!ownerData) {
      throw new BadRequestException(`Owner not found: "${owner}"`);
    }

    if (!name) {
      return ownerData.addons;
    }

    const formattedAddonName: string = formatAddonName(name);
    const addon = ownerData.addons.find(
      (addon) => formatAddonName(addon.name) === formattedAddonName,
    );

    if (!addon) {
      throw new BadRequestException(`Couldn't find the given addon: '${name}'`);
    }

    return addon;
  }

  async getRandomAddons(owner: string, amount: number = 2) {
    if (!owner) {
      throw new BadRequestException(`No addon owner was provided.`);
    }

    const formattedOwnerName = formatOwnerName(owner);
    const ownerData = this.allAddons.find(
      (owner) => formatOwnerName(owner.name) === formattedOwnerName,
    );
    const ownerAddons: Addon[] = [...ownerData.addons];

    if (!ownerData) {
      throw new BadRequestException(`Couldn't find addon owner: "${owner}"`);
    }

    const randomAddons: Addon[] = [];
    for (let i = 0; i < amount; i++) {
      if (ownerAddons.length <= 0) {
        break;
      }

      const randomIndex = Math.floor(Math.random() * ownerAddons.length);
      randomAddons.push(ownerAddons[randomIndex]);
      ownerAddons.splice(randomIndex, 1);
    }

    return randomAddons;
  }
}
