import { userEvents } from "@/utils/events";
import { NumberRange } from "@/utils/utils";
import { publicTamagiStore } from "@/stores/tamagi";

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
  eventHandlers: Partial<
    Record<userEvents, (tamagiStore: publicTamagiStore) => void>
  >;
  evolution: (stats: TamagiStats) => TamagiEvos | null;
  sprite: {
    position: { x: number; y: number };
  };
}
