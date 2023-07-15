import { Tamagi } from "@/stores/tamagi";
import { userEvents } from "./events";
import { convertTime as ct } from "@/utils/utils";

export enum SicknessTypes {
  Healthy,
  Cold,
  Depression,
  //DemonicPossesion,
  //FoodPoisoning,
  //Diarrhea,
  //Constipation,
  //Lonely,
}

/**
 * @tickEffect.time
 * Apply tick effects after this amount of time has passed (in ms)
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
    diesIf?: (tamagi: Tamagi) => boolean;
  };
  actionsToCure?: Partial<Record<userEvents, number>>;
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
      },
    },
  ],
  [
    SicknessTypes.Cold,
    {
      id: SicknessTypes.Cold,
      name: "Cold",
      tickEffects: {
        time: ct(1, "m", "ms"),
        hunger: -10,
        happiness: -10,
        poopchance: 0,
      },
      actionsToCure: { [userEvents.healSick]: 1 },
    },
  ],
  [
    SicknessTypes.Depression,
    {
      id: SicknessTypes.Depression,
      name: "Depression",
      tickEffects: {
        time: ct(5, "m", "ms"),
        hunger: -5,
        happiness: -25,
        poopchance: 0,
      },
      actionsToCure: { [userEvents.play]: 3 },
    },
  ],
]);
