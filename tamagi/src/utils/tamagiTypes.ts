import { Ran } from "./utlis";

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
      tickEffect: {
        hunger: {
          time: 5000,
          value: -2,
        },
        happiness: {
          time: 5000,
          value: -2,
        },
        poop: {
          time: 60000,
          value: 100,
        },
      },
      sprite: {
        position: getSpritePos(0, 8),
      },
    },
  ],
]);

export default tamagiTypes;

function getSpritePos(x: number, y: number) {
  return { x: -x * 16, y: -y * 16 };
}
