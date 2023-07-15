import { getSpritePos } from "@/utils/utils";
import { TamagiEvos, TamagiStats, TamagiType } from "./types";
import { userEvents } from "@/utils/events";
import { convertTime as ct } from "@/utils/utils";

export const baby_0: TamagiType = {
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
    [userEvents.feed]: () => {},
    [userEvents.clean]: () => {},
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
