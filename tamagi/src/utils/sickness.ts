import { Tamagi } from "@/stores/tamagi";

export enum SicknessTypes {
  Healthy,
  Cold,
}

/**
 * @tickEffect.time
 * Time in ms between ticks
 * @tickEffect.hunger
 * Amount of hunger to modify (-/+) per tick
 * @tickEffect.happiness
 * Amount of happiness to modify (-/+) per tick
 * @tickEffect.poopchance
 * Additional or decreased chance to poop per tick
 * @tickEffect.diesIf
 * Special death conditions that can trigger when sick
 */
export type Sickness = {
  id: SicknessTypes;
  name: string;
  tickEffects: {
    time: number;
    hunger: number;
    happiness: number;
    poopchance: number;
    diesIf: (tamagi: Tamagi) => boolean;
  };
};

export const Sicknesses = new Map<SicknessTypes, Sickness>([
  [
    SicknessTypes.Healthy,
    {
      id: SicknessTypes.Healthy,
      name: "Healthy",
      tickEffects: {
        time: 0,
        hunger: 0,
        happiness: 0,
        poopchance: 0,
        diesIf: (tamagi: Tamagi) => false,
      },
    },
  ],
  [
    SicknessTypes.Cold,
    {
      id: SicknessTypes.Cold,
      name: "Cold",
      tickEffects: {
        time: 10000,
        hunger: 10,
        happiness: 10,
        poopchance: 0,
        diesIf: (tamagi: Tamagi) => false,
      },
    },
  ],
]);
