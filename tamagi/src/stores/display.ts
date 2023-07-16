import { create } from "zustand";
import { produce } from "immer";

export const useDisplay = create<iDisplayStore>()((set, get) => ({
  display: {
    status: "OFF",
    pageIndex: 0,
    menuActive: false,
    buttonIndex: 0,
    statIndex: 0,
  },
  //Actions
  setDisplayStatus: (statusValue: string) => {
    set(
      produce<iDisplayStore>((state) => {
        state.display.status = statusValue;
      })
    );
  },
  setPageIndex: (pageIndexValue: number) => {
    set(
      produce<iDisplayStore>((state) => {
        if (state.display.status === "ON") {
          if (pageIndexValue < DisplayMinMax.pageIndexMin) {
            state.display.pageIndex = DisplayMinMax.pageIndexMin;
          } else if (pageIndexValue > DisplayMinMax.pageIndexMax) {
            state.display.pageIndex = DisplayMinMax.pageIndexMax;
          } else {
            state.display.pageIndex = pageIndexValue;
          }
        } else if (state.display.status === "OFF") {
          state.display.pageIndex = 0;
        }
      })
    );
  },
  increasePageIndex: (pageIndexValue: number) => {
    const newPageIndex = get().display.pageIndex + pageIndexValue;
    get().setPageIndex(newPageIndex);
    get().setButtonIndex(0);
  },
  decreasePageIndex: (pageIndexValue: number) => {
    const newPageIndex = get().display.pageIndex - pageIndexValue;
    get().setPageIndex(newPageIndex);
    get().setButtonIndex(0);
  },
  setMenuActive: (menuActiveValue: boolean) => {
    set(
      produce<iDisplayStore>((state) => {
        state.display.menuActive = menuActiveValue;
      })
    );
  },
  setButtonIndex: (buttonIndexValue: number) => {
    set(
      produce<iDisplayStore>((state) => {
        state.display.buttonIndex = buttonIndexValue;
      })
    );
  },
  increaseButtonIndex: (buttonIndexValue: number) => {
    const newButtonIndex = get().display.buttonIndex + buttonIndexValue;
    if (newButtonIndex <= DisplayMinMax.buttonIndexMax) {
      get().setButtonIndex(newButtonIndex);
    }
  },
  decreaseButtonIndex: (buttonIndexValue: number) => {
    const newButtonIndex = get().display.buttonIndex - buttonIndexValue;
    if (newButtonIndex > DisplayMinMax.buttonIndexMin) {
      get().setButtonIndex(newButtonIndex);
    }
  },
  setStatIndex: (statIndexValue: number) => {
    set(
      produce<iDisplayStore>((state) => {
        state.display.statIndex = statIndexValue;
      })
    );
  },
  increaseStatIndex: (statIndexValue: number) => {
    const newStatIndex = get().display.statIndex + statIndexValue;
    if (newStatIndex <= DisplayMinMax.statIndexMax) {
      get().setButtonIndex(newStatIndex);
    }
  },
  decreaseStatIndex: (statIndexValue: number) => {
    const newStatIndex = get().display.statIndex - statIndexValue;
    if (newStatIndex > DisplayMinMax.statIndexMin) {
      get().setStatIndex(newStatIndex);
    }
  },
}));

interface iDisplayStore {
  display: Display;
  setDisplayStatus: (n: string) => void;
  setMenuActive: (n: boolean) => void;
  setPageIndex: (n: number) => void;
  increasePageIndex: (n: number) => void;
  decreasePageIndex: (n: number) => void;
  setButtonIndex: (n: number) => void;
  increaseButtonIndex: (n: number) => void;
  decreaseButtonIndex: (n: number) => void;
  setStatIndex: (n: number) => void;
  increaseStatIndex: (n: number) => void;
  decreaseStatIndex: (n: number) => void;
}

export enum DisplayMinMax {
  pageIndexMax = 3,
  pageIndexMin = 0,
  buttonIndexMax = 3,
  buttonIndexMin = -1,
  statIndexMin = -1,
  statIndexMax = 9,
}

type Display = {
  status: string;
  pageIndex: number;
  menuActive: boolean;
  buttonIndex: number;
  statIndex: number;
};
