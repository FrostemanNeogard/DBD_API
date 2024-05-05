export type Role = 'survivor' | 'killer';

export type Perk = {
  name: string;
  info: string;
  image: string;
  character: string;
};

export type Item = {
  name: string;
  rarity: string;
};

export type Killer = {
  name: string;
  description: string;
  perks: Perk[];
};

export type Survivor = {
  name: string;
  description: string;
  perks: Perk[];
};

export type Offering = {
  name: string;
  description: string;
};

export type Addon = {
  name: string;
};
