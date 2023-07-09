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
    time: 0,
    hungerDecrease: 0,
    happinessDecrease: 0,
    sicknessTick: 0,
  },
  eventInProgress: null,
  //_______________________ Actions _______________________//
  //_______________________ Hunger
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
  //_______________________ Happiness
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
  // _______________________ Sick
  setSick: () => {},
  removeSick: () => {},
  // _______________________ Poop
  setPoop: () => {},
  removePoop: () => {},
  //_______________________ Event Handling _______________________//
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
  //_______________________ Updates _______________________//
  update: (time: number) => {
    const ongoingEvent = get().eventInProgress;

    /**
     * This is going to become much bigger as evolved Tamagis
     * will process events differently
     * Some need more food, some need more sleep, some need more playtime... :)
     * We'll build smaller functions that will take care of this later, for now this will do
     */
    checkEvolution();

    // Event Handling
    if (ongoingEvent) {
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
    }

    // Hardcoded Actions
    if ((time - get().lastUpdate.hungerDecrease) / 1000 >= 5) {
      if (get().tamagi.hunger === TamagiMinMax.HungerMin) {
        get().decreaseHappiness(10);
      }
      get().decreaseHunger(2);
      get().updateLastUpdate({ ...get().lastUpdate, hungerDecrease: time });
    }
    get().updateLastUpdate({ ...get().lastUpdate, time: time });
  },
  updateLastUpdate: (lastUpdate: TamagiLastUpdate) => {
    set(
      produce<iTamagiStore>((state) => {
        state.lastUpdate = lastUpdate;
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
  lastUpdate: TamagiLastUpdate;
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
  updateLastUpdate: (lastUpdate: TamagiLastUpdate) => void;
}

interface TamagiLastUpdate {
  time: number;
  hungerDecrease: number;
  happinessDecrease: number;
  sicknessTick: number;
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
