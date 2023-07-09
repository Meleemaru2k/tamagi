import { create } from "zustand";
import { produce } from "immer";

export const useDisplay = create<iDisplayStore>()((set, get) => ({
  display: {
    status: "OFF",
    pageIndex: 1,
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
        if (pageIndexValue < DisplayMinMax.pageIndexMin) {
          state.display.pageIndex = DisplayMinMax.pageIndexMin;
        } else if (pageIndexValue > DisplayMinMax.pageIndexMax) {
          state.display.pageIndex = DisplayMinMax.pageIndexMax;
        } else {
          state.display.pageIndex = pageIndexValue;
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
  pageIndexMin = 1,
}

type Display = {
  status: string;
  pageIndex: number;
};