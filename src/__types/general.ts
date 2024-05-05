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
};

export type Survivor = {
  name: string;
};

export type Offering = {
  name: string;
  description: string;
};

export type Addon = {
  name: string;
};
