export interface generalEvent {
  type: any;
  time: number;
  timeCreated: number;
  canBeInterrupted?: boolean;
}

export interface cpuEvent extends generalEvent {
  type: cpuEvents;
}

export interface userEvent extends generalEvent {
  type: userEvents;
}

export enum userEvents {
  feed,
  clean,
  healSick,
  play,
  putToSleep,
}

export enum cpuEvents {
  gettingSick,
  gettingBored,
  pooping,
}

// User Events
export const feed: userEvent = {
  time: 3000,
  type: userEvents.feed,
  timeCreated: 0,
};

export const clean: userEvent = {
  time: 3000,
  type: userEvents.clean,
  timeCreated: 0,
};

export const healSick: userEvent = {
  time: 3000,
  type: userEvents.healSick,
  timeCreated: 0,
};

export const play: userEvent = {
  time: 6000,
  type: userEvents.play,
  timeCreated: 0,
};

export const putToSleep: userEvent = {
  time: 0,
  type: userEvents.putToSleep,
  timeCreated: 0,
};

// CPU Events
export const gettingSick: cpuEvent = {
  time: 3000,
  type: cpuEvents.gettingSick,
  timeCreated: 0,
};

// All
const events = {
  userEvents: [feed, clean, healSick, play, putToSleep],
  cpuEvents: [gettingSick],
};
export default events;
