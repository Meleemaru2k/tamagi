import { create } from "zustand";
import { produce } from "immer";
import { userEvent, cpuEvent, userEvents, generalEvent } from "@/utils/events";
import Tamagi from "@/components/game/display/tamagi";
import { Sickness, Sicknesses } from "@/utils/sickness";
import { SicknessTypes } from "@/utils/sickness";
import TamagiTypes from "@/utils/tamagi/tamagiMap";
import {
  TamagiEvos,
  TamagiStats,
  TamagiType,
} from "@/utils/tamagi/tamagiEvolutions/types";

export const useTamagi = create<iTamagiStore>()((set, get) => ({
  tamagi: {
    type: TamagiTypes.get(TamagiEvos.Baby) as TamagiType,
    name: "John",
    age: 0,
    hunger: 50,
    happiness: 50,
    sick: {
      type: Sicknesses.get(SicknessTypes.Healthy) as Sickness,
      timeCreated: 0,
      timeHealed: 0,
    },
    poop: null,
    sleep: null,
    dead: false,
  },
  tamagiHistoryStats: {
    age: 0,
    unhappyTicks: 0,
    happyTicks: 0,
    starvingTicks: 0,
    wellFedTicks: 0,
    dirtyTicks: 0,
    sickTicks: 0,
  },
  animation: {
    type: "breathing",
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
  setName: (nameValue: string) => {
    set(
      produce<iTamagiStore>((state) => {
        state.tamagi.name = nameValue;
      })
    );
  },
  //_______________________ Hunger
  setHunger: (hungerValue: number) => {
    set(
      produce<iTamagiStore>((state) => {
        const minMax = state.tamagi.type.minMaxStats.hunger;

        if (hungerValue < minMax[0]) {
          state.tamagi.hunger = minMax[0];
        } else if (hungerValue > minMax[1]) {
          state.tamagi.hunger = minMax[1];
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
  //_______________________ Happiness
  setHappiness: (happinessValue: number) => {
    set(
      produce<iTamagiStore>((state) => {
        const minMax = state.tamagi.type.minMaxStats.happiness;

        if (happinessValue < minMax[0]) {
          state.tamagi.happiness = minMax[0];
        } else if (happinessValue > minMax[1]) {
          state.tamagi.happiness = minMax[1];
        } else {
          state.tamagi.happiness = happinessValue;
        }
      })
    );
  },
  increaseHappiness: (happinessValue: number) => {
    const newHappiness = happinessValue + get().tamagi.happiness;
    get().setHappiness(newHappiness);
  },
  // _______________________ Sick
  //@TODO: Add Sickness Types?
  setSick: (type: SicknessTypes, time?: number) => {
    set(
      produce<iTamagiStore>((state) => {
        state.tamagi.sick = {
          type: Sicknesses.get(type) as Sickness,
          timeCreated: time ?? new Date().getTime(),
          timeHealed: null,
        };
      })
    );
  },
  removeSick: () => {
    set(
      produce<iTamagiStore>((state) => {
        if (state.tamagi.sick?.timeHealed === null) {
          state.tamagi.sick.timeHealed = new Date().getTime();
        }
      })
    );
  },
  // _______________________ Poop
  setPoop: () => {},
  removePoop: () => {},
  //_______________________ Event Handling _______________________//
  addEvent: (event: userEvent | cpuEvent) => {
    set(
      produce<iTamagiStore>((state) => {
        state.eventInProgress = event;
        state.animation.type = getAnimation(event);
      })
    );
  },
  clearEvent: () => {
    set(
      produce<iTamagiStore>((state) => {
        //@TODO: Make a function that handles this (setAnimationByEvent())
        state.eventInProgress = null;
        state.animation.type = getAnimation();
      })
    );
  },
  //_______________________ Updates _______________________//
  update: (time: number) => {
    const ongoingEvent = get().eventInProgress;
    const minMax = get().tamagi.type.minMaxStats;

    /**
     * This is going to become much bigger as evolved Tamagis
     * will process events differently
     * Some need more food, some need more sleep, some need more playtime... :)
     * We'll build smaller functions that will take care of this later, for now this will do
     */
    const evolveInto = get().tamagi.type.evolution(get().tamagiHistoryStats);
    if (evolveInto) {
      set(
        produce<iTamagiStore>((state) => {
          state.tamagi.type = TamagiTypes.get(evolveInto) as TamagiType;
        })
      );
      return;
    }

    // Event Handling
    if (ongoingEvent) {
      switch (get().tamagi.type.id) {
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

    // @TODO: handle animations
    // ...no implemented yet
    //handle sickness
    if (
      get().tamagi.sick?.timeHealed === null &&
      (time - get().lastUpdate.sicknessTick) / 1000 >= 30
    ) {
      get().increaseHunger(-10);
      get().increaseHappiness(-10);
      get().updateLastUpdate({ ...get().lastUpdate, sicknessTick: time });
    }

    // Automatic Stat Decrease
    if (
      time - get().lastUpdate.hungerDecrease >=
      get().tamagi.type.tickEffects.hunger.time
    ) {
      if (get().tamagi.hunger === minMax.hunger[0]) {
        get().increaseHappiness(-10);
      }
      get().increaseHunger(get().tamagi.type.tickEffects.hunger.value);
      get().updateLastUpdate({ ...get().lastUpdate, hungerDecrease: time });
    }

    if (
      time - get().lastUpdate.happinessDecrease >=
      get().tamagi.type.tickEffects.happiness.time
    ) {
      if (get().tamagi.happiness === minMax.happiness[0]) {
        get().increaseHunger(-10);
      }
      get().increaseHappiness(get().tamagi.type.tickEffects.happiness.value);
      get().updateLastUpdate({ ...get().lastUpdate, happinessDecrease: time });
    }

    // Sickness stuff
    // We'll have some more fun logic here based on other stats later - the hungrier & sadder the tamagi is, the more likely it is to get sick
    const getSick =
      Math.floor(Math.random() * 100) < 10 &&
      time -
        (get().tamagi.sick?.timeHealed ??
          time + get().tamagi.type.tickEffects.nextSicknessDelay + 1) >
        get().tamagi.type.tickEffects.nextSicknessDelay;

    if (getSick) {
      get().setSick(1, time);
    }

    if (get().tamagi.sick.timeHealed) {
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

function getAnimation(event?: generalEvent) {
  if (!event) return "breathing";

  switch (event.type) {
    case userEvents.feed:
      return "eating";
    case userEvents.clean:
      return "cleaning";
    case userEvents.play:
      return "playing";
    case userEvents.healSick:
      return "healing";
    default:
      return "breathing";
  }
}

//_______________________ Types _______________________//

interface iTamagiStore {
  tamagi: Tamagi;
  eventInProgress: userEvent | cpuEvent | null;
  lastUpdate: TamagiLastUpdate;
  animation: {
    type: string;
  };
  tamagiHistoryStats: TamagiStats;
  setName: (n: string) => void;
  setHunger: (value: number) => void;
  increaseHunger: (value: number) => void;
  setHappiness: (value: number) => void;
  increaseHappiness: (value: number) => void;
  setPoop: () => void;
  removePoop: () => void;
  setSick: (type: SicknessTypes, time?: number) => void;
  removeSick: () => void;
  update: (time: number) => void;
  addEvent: (event: userEvent | cpuEvent) => void;
  clearEvent: () => void;
  updateLastUpdate: (lastUpdate: TamagiLastUpdate) => void;
}

export type publicTamagiStore = Pick<
  iTamagiStore,
  | "increaseHunger"
  | "increaseHappiness"
  | "setPoop"
  | "removePoop"
  | "setSick"
  | "removeSick"
>;

interface TamagiLastUpdate {
  time: number;
  hungerDecrease: number;
  happinessDecrease: number;
  sicknessTick: number;
}

export type Tamagi = {
  type: TamagiType;
  name: string;
  age: number;
  hunger: number;
  happiness: number;
  sick: {
    type: Sickness;
    timeCreated: number;
    timeHealed: number | null;
  };
  poop?: {
    type: number;
    timeCreated: number;
    timeHealed: number | null;
  } | null;
  sleep?: {
    type: number;
    timeCreated: number;
    timeHealed: number | null;
  } | null;
  dead: boolean;
};
