import { BadRequestException, Injectable } from '@nestjs/common';
import * as offeringData from '../__data/offerings.json';
import { Offering, Role } from 'src/__types/general';
import { defaultTextFormatter } from 'src/__util/functions';

@Injectable()
export class OfferingsService {
  private readonly allOfferings = [
    ...offeringData.killer,
    ...offeringData.survivor,
  ];
  private readonly killerOfferings = [...offeringData.killer];
  private readonly survivorOfferings = [...offeringData.survivor];

  async getAllOfferings(role: Role): Promise<Offering[]> {
    if (!role) {
      return this.allOfferings;
    }
    return role === 'killer' ? this.killerOfferings : this.survivorOfferings;
  }

  async getOffering(name: string): Promise<Offering[]> {
    const offeringData = this.allOfferings.find(
      (offering) =>
        defaultTextFormatter(offering.name) == defaultTextFormatter(name),
    );
    if (!offeringData) {
      throw new BadRequestException(`Offering not found: "${name}"`);
    }
    return [offeringData];
  }

  async getRandomOffering(role?: Role): Promise<Offering[]> {
    let offerings = [];
    if (!role) {
      offerings = this.allOfferings;
    } else if (role === 'killer') {
      offerings = this.killerOfferings;
    } else {
      offerings = this.survivorOfferings;
    }
    const randomIndex = Math.floor(Math.random() * offerings.length);
    const randomOffering = offerings[randomIndex];
    return [randomOffering];
  }
}
