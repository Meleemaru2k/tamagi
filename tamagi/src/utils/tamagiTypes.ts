import { Ran } from "./utlis";

export enum TamagiEvos {
  Baby,
  Child__Goblin,
  Child__Ghost,
  Child__Beetle,
}

/**
 * @tickEffect.poop.value
 * This is a %-chance value that should be between 0 and 100
 */
export interface TamagiType {
  id: TamagiEvos;
  name: string;
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
