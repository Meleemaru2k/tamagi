import { create } from "zustand";
import { produce } from "immer";

export const useTamagi = create<iTamagiStore>((set, get) => ({
  tamagi: {
    name: "Jhonny McJohnface",
    age: 0,
    hunger: 0,
    happiness: 0,
    sick: null,
    poop: null,
    sleep: null,
    dead: false,
  },
  //Actions
  setHunger: (hungerValue: number) =>
    set(
      produce((state) => {
        if (hungerValue < TamagiMinMax.HungerMin) {
          state.tamagi.hunger = TamagiMinMax.HungerMin;
        } else if (hungerValue > TamagiMinMax.HungerMax) {
          state.tamagi.hunger = TamagiMinMax.HungerMax;
        } else {
          state.tamagi.hunger = hungerValue;
        }
      })
    ),
  increaseHunger: (hungerValue: number) => {
    const newHunger = hungerValue + get().tamagi.hunger;
    get().setHunger(newHunger);
  },
  decreaseHunger: (hungerValue: number) => {
    const newHunger = get().tamagi.hunger - hungerValue;
    get().setHunger(newHunger);
  },
}));

interface iTamagiStore {
  tamagi: Tamagi;
  setHunger: (n: number) => void;
  increaseHunger: (n: number) => void;
  decreaseHunger: (n: number) => void;
}

export enum TamagiMinMax {
  HungerMax = 100,
  HungerMin = 0,
  HappinessMax = 100,
  HappinessMin = 0,
  AgeMax = 100,
  AgeMin = 0,
}

type Tamagi = {
  name: string;
  age: number;
  hunger: number;
  happiness: number;
  sick?: {
    type: number;
    dateCreated: number;
    dateHealead: number | null;
  } | null;
  poop?: {
    type: number;
    dateCreated: number;
    dateHealead: number | null;
  } | null;
  sleep?: {
    type: number;
    dateCreated: number;
    dateHealead: number | null;
  } | null;
  dead: boolean;
};
