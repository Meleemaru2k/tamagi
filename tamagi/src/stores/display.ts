import { create } from "zustand";
import { produce } from "immer";

export const useDisplay = create<iDisplayStore>()((set, get) => ({
  display: {
    status: "OFF",
    pageIndex: 0,
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
    const newPageIndex = get().display.pageIndex - pageIndexValue;
    get().setPageIndex(newPageIndex);
  },
  decreasePageIndex: (pageIndexValue: number) => {
    const newPageIndex = get().display.pageIndex + pageIndexValue;
    get().setPageIndex(newPageIndex);
  },
}));

interface iDisplayStore {
  display: Display;
  setDisplayStatus: (n: string) => void;
  setPageIndex: (n: number) => void;
  increasePageIndex: (n: number) => void;
  decreasePageIndex: (n: number) => void;
}

export enum DisplayMinMax {
  pageIndexMax = 3,
  pageIndexMin = 0,
}

type Display = {
  status: string;
  pageIndex: number;
};
