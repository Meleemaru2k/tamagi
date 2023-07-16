import { create } from "zustand";
import { produce } from "immer";

export const useTamagiShell = create<iTamagiShellStore>()((set, get) => ({
  tamagiShell: {
    colour: "green",
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

export enum TamagiShellColour {
  "red",
  "blue",
  "green",
  "teal",
}

type TamagiShell = {
  colour: string;
};
