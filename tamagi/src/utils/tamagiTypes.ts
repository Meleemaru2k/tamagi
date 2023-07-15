import { statSync } from "fs";
import { Ran } from "./utlis";
import { convertTime as ct } from "./utlis";
import { ScriptKind } from "typescript";

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
  tickEffect: {
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
      value: Ran<101>;
    };
  };
  eventHandlers: any;
  evolution: (stats: TamagiStats) => TamagiEvos | null;
  sprite: {
    position: { x: number; y: number };
  };
}

const tamagiTypes = new Map<TamagiEvos, TamagiType>([
  [
    TamagiEvos.Baby,
    {
      id: TamagiEvos.Baby,
      name: "Baby",
      idleAnimation: "breathing",
      minMaxStats: {
        hunger: [0, 100],
        happiness: [0, 100],
        maxAge: 3,
      },
      tickEffect: {
        hunger: {
          time: ct(15, "s", "ms"),
          value: -2,
        },
        happiness: {
          time: ct(30, "s", "ms"),
          value: -2,
        },
        poop: {
          time: ct(10, "m", "ms"),
          value: 100,
        },
      },
      eventHandlers: {},
      evolution: (stats: TamagiStats) => {
        if (stats.age < ct(1, "h", "ms")) return null;
        switch (true) {
          case stats.dirtyTicks > ct(30, "m", "ms") ||
            stats.starvingTicks > ct(30, "m", "ms"):
            return TamagiEvos.Baby_BrownSlime;
          case stats.wellFedTicks > ct(30, "m", "ms") &&
            stats.sickTicks > ct(15, "m", "ms"):
            return TamagiEvos.Baby_Bat;
          case stats.wellFedTicks > ct(10, "m", "ms") &&
            stats.happyTicks > ct(10, "m", "ms") &&
            stats.dirtyTicks < ct(15, "m", "ms") &&
            stats.starvingTicks < ct(15, "m", "ms"):
            stats.sickTicks < ct(15, "m", "ms");
            return TamagiEvos.Baby_Rabbit;
          default:
            return TamagiEvos.Baby_Rat;
        }
      },
      sprite: {
        position: getSpritePos(0, 8),
      },
    },
  ],
]);

// For now lets treat a tick as a gameloop update (every Second at the moment)
type TamagiStats = {
  age: number;
  unhappyTicks: number;
  happyTicks: number;
  starvingTicks: number;
  wellFedTicks: number;
  dirtyTicks: number;
  sickTicks: number;
};

export default tamagiTypes;

function getSpritePos(row: number, col: number) {
  return { x: -row * 16, y: -col * 16 };
}
