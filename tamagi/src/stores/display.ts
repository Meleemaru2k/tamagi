import { create } from "zustand";
import { produce } from "immer";

export const useDisplay = create<iDisplayStore>()((set, get) => ({
  display: {
    status: "OFF",
    iconIndex: 1,
  },
  //Actions
  setDisplayStatus: (statusValue: string) => {
    set(
      produce<iDisplayStore>((state) => {
        state.display.status = statusValue;
      })
    );
  },
  setIconIndex: (iconIndexValue: number) => {
    set(
      produce<iDisplayStore>((state) => {
        if (iconIndexValue < DisplayMinMax.iconIndexMin) {
          state.display.iconIndex = DisplayMinMax.iconIndexMax;
        } else if (iconIndexValue > DisplayMinMax.iconIndexMax) {
          state.display.iconIndex = DisplayMinMax.iconIndexMin;
        } else {
          state.display.iconIndex = iconIndexValue;
        }
      })
    );
  },
  increaseIconIndex: (iconIndexValue: number) => {
    const newIconIndex = get().display.iconIndex - iconIndexValue;
    get().setIconIndex(newIconIndex);
  },
  decreaseIconIndex: (iconIndexValue: number) => {
    const newIconIndex = get().display.iconIndex + iconIndexValue;
    get().setIconIndex(newIconIndex);
  },
}));

interface iDisplayStore {
  display: Display;
  setDisplayStatus: (n: string) => void;
  setIconIndex: (n: number) => void;
  increaseIconIndex: (n: number) => void;
  decreaseIconIndex: (n: number) => void;
}

export enum DisplayMinMax {
  iconIndexMax = 20,
  iconIndexMin = 1,
}

type Display = {
  status: string;
  iconIndex: number;
};
