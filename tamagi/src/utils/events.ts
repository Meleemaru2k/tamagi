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
  puke,
  overfed,
  exhausted,
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
  time: 8000,
  type: userEvents.play,
  timeCreated: 0,
};

export const putToSleep: userEvent = {
  time: 0,
  type: userEvents.putToSleep,
  timeCreated: 0,
};

// CPU Events
export const puke: cpuEvent = {
  time: 3000,
  type: cpuEvents.puke,
  timeCreated: 0,
};

export const overfed: cpuEvent = {
  time: 3000,
  type: cpuEvents.overfed,
  timeCreated: 0,
};

export const exhausted: cpuEvent = {
  time: 3000,
  type: cpuEvents.exhausted,
  timeCreated: 0,
};

// All
const events = {
  userEvents: [feed, clean, healSick, play, putToSleep],
  cpuEvents: [puke],
};
export default events;
