import { create } from "zustand";
import { produce } from "immer";


export const useTamagiShell = create<iTamagiShellStore>()((set, get) => ({
    tamagiShell: {
        colour: "green"
    },
    //Actions
    setTamagiShellColour: (colourValue: string) => {
      set(
        produce<iTamagiShellStore>((state) => {
            state.tamagiShell.colour = colourValue;
        })
      );
    },
}));


interface iTamagiShellStore {
    tamagiShell: TamagiShell;
    setTamagiShellColour: (n: string) => void;
}

/*
export enum TamagiMinMax {
  HungerMax = 100,
  HungerMin = 0,
  HappinessMax = 100,
  HappinessMin = 0,
  AgeMax = 100,
  AgeMin = 0,
}
*/
  
type TamagiShell = {
  colour: string;
};
