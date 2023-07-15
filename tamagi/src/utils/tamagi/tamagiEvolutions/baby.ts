import { getSpritePos } from "@/utils/utils";
import { TamagiEvos, TamagiStats, TamagiType } from "./types";
import { userEvents } from "@/utils/events";
import { convertTime as ct } from "@/utils/utils";

export const baby: TamagiType = {
  id: TamagiEvos.Baby,
  name: "Baby",
  idleAnimation: "breathing",
  minMaxStats: {
    hunger: [0, 100],
    happiness: [0, 100],
    maxAge: 3,
  },
  tickEffects: {
    hunger: {
      time: ct(15, "s", "ms"),
      value: -2,
    },
    happiness: {
      time: ct(30, "s", "ms"),
      value: -2,
    },
    poop: {
      time: ct(10, "m", "ms"),
      value: 100,
    },
    nextSicknessDelay: ct(15, "m", "ms"),
  },
  eventHandlers: {
    [userEvents.feed]: (tamagiStore) => {
      tamagiStore.modifyHunger(20);
    },
    [userEvents.play]: (tamagiStore) => {
      tamagiStore.modifyHappiness(20);
    },
    [userEvents.clean]: (tamagiStore) => {
      tamagiStore.removePoop();
    },
    [userEvents.healSick]: (tamagiStore) => {
      tamagiStore.removeSick();
    },
  },
  evolution: (stats: TamagiStats) => {
    if (stats.age < ct(1, "h", "ms")) return null;
    switch (true) {
      case stats.dirtyTicks > ct(30, "m", "ms") ||
        stats.starvingTicks > ct(30, "m", "ms"):
        return TamagiEvos.Baby_BrownSlime;
      case stats.wellFedTicks > ct(30, "m", "ms") &&
        stats.sickTicks > ct(15, "m", "ms"):
        return TamagiEvos.Baby_Bat;
      case stats.wellFedTicks > ct(10, "m", "ms") &&
        stats.happyTicks > ct(10, "m", "ms") &&
        stats.dirtyTicks < ct(15, "m", "ms") &&
        stats.starvingTicks < ct(15, "m", "ms"):
        stats.sickTicks < ct(15, "m", "ms");
        return TamagiEvos.Baby_Rabbit;
      default:
        return TamagiEvos.Baby_Rat;
    }
  },
  sprite: {
    position: getSpritePos(0, 8),
  },
};

export const baby_rat = {
  ...baby,
  id: TamagiEvos.Baby_Rat,
  name: "Baby Rat",
  evolution: (stats: TamagiStats) => {
    return null;
  },
};

export const baby_bat = {
  ...baby,
  id: TamagiEvos.Baby_Bat,
  name: "Baby Bat",
  evolution: (stats: TamagiStats) => {
    return null;
  },
};

export const baby_brownSlime = {
  ...baby,
  id: TamagiEvos.Baby_BrownSlime,
  name: "Baby Brown Slime",
  evolution: (stats: TamagiStats) => {
    return null;
  },
};

export const baby_rabbit = {
  ...baby,
  id: TamagiEvos.Baby_Rabbit,
  name: "Baby Rabbit",
  evolution: (stats: TamagiStats) => {
    return null;
  },
};
