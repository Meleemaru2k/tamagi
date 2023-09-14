import { userEvents } from "@/utils/events";
import { NumberRange } from "@/utils/utils";
import { PublicTamagiStore } from "@/stores/tamagi";

export enum TamagiEvos {
  Baby, //Green Slime
  Baby_Rabbit,
  Baby_Rat,
  Baby_Bat,
  Baby_BrownSlime, //If youre really bad lol
  Child__Goblin,
  Child__Ghost,
  Child__BlueBeetle,
  Child__TurquoiseBeetle,
  Child_Bat,
  Child_Snake,
  Child_Boar,
  Child_Rat,
  Child_Dog,
  Child_Skeleton,
  Adult_GoblinWarrior,
  Adult_GoblinRogue,
  Adult_MudGoblin,
  Adult_VampireBat,
  Adult_Spider,
  Adult_VenomSpider,
  Adult_Dog,
  Adult_Wolf,
  Adult_Ghost,
  Adult_BlueBeetle,
  Adult_TurquoiseBeetle,
  Adult_RedBeetle,
  Adult_GreenSnake,
  Adult_PurpleSnake,
  Adult_SkeletonWarrior,
  Adult_SkeletonSpearman,
  Adult_SkeletonMage,
  Adult_Scorpion,
  Adult_Goblin,
  Adult_Crab,
  Mystic_ShamanHumanDudeGuyTopRight,
  Mystic_Reaper,
  Mystic_GhostPhantom,
  Mystic_FireBeetle,
  Mystic_ThunderWyrm,
  Mystic_ArcticWyrm,
  Mystic_PurpleSlime, // The rarest one!
}

// For now lets treat a tick as a gameloop update (every Second at the moment)
export type TamagiStats = {
  age: number;
  unhappyTicks: number;
  happyTicks: number;
  starvingTicks: number;
  wellFedTicks: number;
  dirtyTicks: number;
  sickTicks: number;
};

/**
 * @tickEffect.poop.value
 * This is a %-chance value that should be between 0 and 100
 */
export interface TamagiType {
  id: TamagiEvos;
  name: string;
  idleAnimation: string;
  minMaxStats: {
    hunger: [number, number];
    happiness: [number, number];
    maxAge: number;
  };
  tickEffects: {
    hunger: {
      time: number;
      value: number;
    };
    happiness: {
      time: number;
      value: number;
    };
    poop: {
      time: number;
      value: NumberRange<101>;
    };
    nextSicknessDelay: number;
  };
  eventHandlers: Record<
    userEvents,
    (tamagiStore: PublicTamagiStore, time: number) => void
  >;
  evolution: (stats: TamagiStats) => TamagiEvos | null;
  sprite: {
    position: { x: number; y: number };
  };
}

export interface TamagiJSON {
  id: TamagiEvos | string;
  name: string;
  gfx: {
    base: TamagiJSON_Animation;
    idle: TamagiJSON_Animation;
    sick: TamagiJSON_Animation;
    eating: TamagiJSON_Animation;
    sleeping: TamagiJSON_Animation;
  };
  minMaxStats: {
    age: Omit<TamagiJSON_MinMaxStat, "min">;
    hunger: TamagiJSON_MinMaxStat;
    happiness: TamagiJSON_MinMaxStat;
    poop: TamagiJSON_MinMaxStat;
  };
  tickEffects: {
    hunger: TamagiJSON_TickEffect;
    happiness: TamagiJSON_TickEffect;
    /**
     * Value = % chance to poop
     * Time = Delay to next poop after pooping
     */
    poop: TamagiJSON_TickEffect;
    /**
     * Value = % chance to get sick
     * Time = Delay to next sickness-roll after healed sickness
     */
    sick: TamagiJSON_TickEffect;
  };
  eventHandlers: Record<
    userEvents,
    (tamagiStore: PublicTamagiStore, time: number) => void
  >;
  evolutionRequirements: TamagiJSON_EvoltionRequirement;
  evolution: (stats: TamagiStats) => TamagiEvos | null;
  sprite: {
    position: { x: number; y: number };
  };
}

export interface TamagiJSON_MinMaxStat {
  min: number;
  max: number;
}

export interface TamagiJSON_Animation {
  file: string;
  frames: number[];
}

export interface TamagiJSON_TickEffect {
  default: {
    time: number;
    value: number;
  };
  sick?: {
    time: number;
    value: number;
  };
  unhappy?: {
    time: number;
    value: number;
  };
  happy?: {
    time: number;
    value: number;
  };
  wellFed?: {
    time: number;
    value: number;
  };
  starving?: {
    time: number;
    value: number;
  };
}

export interface TamagiJSON_EvoltionRequirement {
  age: number;
  happinessTicks: [number, number]; // range, but if max = 0 then there is no max limit
  sicknessTicks: [number, number];
  starvingTicks: [number, number];
  wellFedTicks: [number, number];
  dirtyTicks: [number, number];
}
