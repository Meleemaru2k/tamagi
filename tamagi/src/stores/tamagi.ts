import { create } from "zustand";
import { produce } from "immer";
import { userEvent, cpuEvent, userEvents } from "@/utils/types";

export const useTamagi = create<iTamagiStore>()((set, get) => ({
  tamagi: {
    type: 0,
    name: "Jhonny McJohnface",
    age: 0,
    hunger: 50,
    happiness: 50,
    sick: null,
    poop: null,
    sleep: null,
    dead: false,
  },
  /**
   * @description
   * The last time the tamagi was updated
   * or when a certain automatic-stat-decrease happened
   */
  lastUpdate: {
    time: new Date().getTime(),
    hungerDecrease: new Date().getTime(),
    happinessDecrease: new Date().getTime(),
    sicknessTick: new Date().getTime(),
  },
  eventInProgress: null,
  //Actions
  setHunger: (hungerValue: number) => {
    set(
      produce<iTamagiStore>((state) => {
        if (hungerValue < TamagiMinMax.HungerMin) {
          state.tamagi.hunger = TamagiMinMax.HungerMin;
        } else if (hungerValue > TamagiMinMax.HungerMax) {
          state.tamagi.hunger = TamagiMinMax.HungerMax;
        } else {
          state.tamagi.hunger = hungerValue;
        }
      })
    );
  },
  increaseHunger: (hungerValue: number) => {
    const newHunger = hungerValue + get().tamagi.hunger;
    get().setHunger(newHunger);
  },
  decreaseHunger: (hungerValue: number) => {
    const newHunger = get().tamagi.hunger - hungerValue;
    get().setHunger(newHunger);
  },
  setHappiness: (happinessValue: number) => {
    set(
      produce<iTamagiStore>((state) => {
        if (happinessValue < TamagiMinMax.HappinessMin) {
          state.tamagi.happiness = TamagiMinMax.HappinessMin;
        } else if (happinessValue > TamagiMinMax.HappinessMax) {
          state.tamagi.happiness = TamagiMinMax.HappinessMax;
        } else {
          state.tamagi.happiness = happinessValue;
        }
      })
    );
  },
  increaseHappiness: (happinessValue: number) => {},
  decreaseHappiness: (happinessValue: number) => {},
  setSick: () => {},
  removeSick: () => {},
  setPoop: () => {},
  removePoop: () => {},
  // Event Handling
  addEvent: (event: userEvent | cpuEvent) => {
    set(
      produce<iTamagiStore>((state) => {
        state.eventInProgress = event;
      })
    );
  },
  clearEvent: () => {
    set(
      produce<iTamagiStore>((state) => {
        state.eventInProgress = null;
      })
    );
  },
  // Updates
  update: (time: number) => {
    const ongoingEvent = get().eventInProgress;
    if (!ongoingEvent) return;

    /**
     * This is going to become much bigger as evolved Tamagis
     * will process events differently
     * Some need more food, some need more sleep, some need more playtime... :)
     * We'll build smaller functions that will take care of this later, for now this will do
     */
    checkEvolution();
    switch (get().tamagi.type) {
      default:
      case TamagiEvos.Baby:
        if (time - ongoingEvent.timeCreated > ongoingEvent.time) {
          switch (ongoingEvent.type) {
            case userEvents.feed:
              get().increaseHunger(20);
              break;
            case userEvents.clean:
              get().removePoop();
              break;
            case userEvents.healSick:
              get().removeSick();
              break;
            case userEvents.play:
              get().increaseHappiness(20);
            default:
              break;
          }
          get().clearEvent();
        }
        break;
    }

    // Non Event but hardcoded things
  },
  updateLastUpdate: (time: number) => {
    set(
      produce<iTamagiStore>((state) => {
        state.lastUpdate.time = time;
      })
    );
  },
}));

function checkEvolution() {
  return;
}

enum TamagiEvos {
  Baby,
  Child__Goblin,
  Child__Ghost,
  Child__Beetle,
}

interface iTamagiStore {
  tamagi: Tamagi;
  eventInProgress: userEvent | cpuEvent | null;
  lastUpdate: {
    time: number;
    hungerDecrease: number;
    happinessDecrease: number;
    sicknessTick: number;
  };
  setHunger: (n: number) => void;
  increaseHunger: (n: number) => void;
  decreaseHunger: (n: number) => void;
  setHappiness: (n: number) => void;
  increaseHappiness: (n: number) => void;
  decreaseHappiness: (n: number) => void;
  setPoop: () => void;
  removePoop: () => void;
  setSick: () => void;
  removeSick: () => void;
  update: (time: number) => void;
  addEvent: (event: userEvent | cpuEvent) => void;
  clearEvent: () => void;
}

export enum TamagiMinMax {
  HungerMax = 100,
  HungerMin = 0,
  HappinessMax = 100,
  HappinessMin = 0,
  AgeMax = 100,
  AgeMin = 0,
}

export type Tamagi = {
  type: TamagiEvos;
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
