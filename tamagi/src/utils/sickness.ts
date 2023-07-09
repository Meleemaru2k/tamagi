import { Tamagi } from "@/stores/tamagi";

export enum SicknessTypes {
  Healthy,
  Cold,
}
export type Sickness = {
  id: SicknessTypes;
  name: string;
  tickEffect: {
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
      tickEffect: {
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
      tickEffect: {
        time: 10000,
        hunger: 10,
        happiness: 10,
        poopchance: 0,
        diesIf: (tamagi: Tamagi) => false,
      },
    },
  ],
]);
