"use client";
import { Tamagi, useTamagi } from "@/stores/tamagi";
import {
  cpuEvent,
  cpuEvents,
  userEvent,
  userEvents,
  feed,
  puke,
  healSick,
  play,
  clean,
} from "@/utils/events";

//@TODO: Handle time as seconds or something? Or live with not super accurate milliseconds?
// This would be much better as a class, but for fun and practice it's an object
const gameloop = {
  lastUpdate: new Date().getTime(),
  eventQueue: {
    userEvents: [] as userEvent[],
    cpuEvents: [] as cpuEvent[],
  },
  interval: null as ReturnType<typeof setInterval> | null,
  start: function () {
    if (typeof window === "undefined") return; // Prevent running on server
    else if (!this.interval)
      this.interval = setInterval(this.update, 1000, {
        cpuEvents: this.eventQueue.cpuEvents,
        userEvents: this.eventQueue.userEvents,
        lastUpdate: this.lastUpdate,
        updateLastUpdate: this.setLastUpdate,
      });
    else
      console.warn("GL:: Can't start Game loop because it's already running");
  },
  stop: function () {
    if (this.interval) clearInterval(this.interval);
    else console.warn("GL:: Can't stop Game loop because it's not running");
  },
  isRunning: function () {
    return this.interval ? true : false;
  },
  setLastUpdate: function (time: number) {
    this.lastUpdate = time;
  },
  addUserEvent: function (eventType: userEvents) {
    if (this.eventQueue.userEvents.length) return; //queue only one userEvent for now
    switch (eventType) {
      case userEvents.feed:
        this.eventQueue.userEvents.push({
          ...feed,
          timeCreated: new Date().getTime(),
        });
        break;
      case userEvents.healSick:
        this.eventQueue.userEvents.push({
          ...healSick,
          timeCreated: new Date().getTime(),
        });
        break;
      case userEvents.play:
        this.eventQueue.userEvents.push({
          ...play,
          timeCreated: new Date().getTime(),
        });
      case userEvents.clean:
        this.eventQueue.userEvents.push({
          ...clean,
          timeCreated: new Date().getTime(),
        });
        break;
      default:
        break;
    }
  },
  //These are for later, when we have stuff from "outside" like from playing a game with the Tamagi
  addCpuEvent: function (eventType: cpuEvents) {
    switch (eventType) {
      case cpuEvents.puke:
        this.eventQueue.cpuEvents.push({
          ...puke,
          timeCreated: new Date().getTime(),
        });
        break;
      default:
        break;
    }
  },
  update: function (data: {
    cpuEvents: cpuEvent[];
    userEvents: userEvent[];
    lastUpdate: number;
    updateLastUpdate: (time: number) => void;
  }) {
    const currentTime = new Date().getTime();
    data.updateLastUpdate(currentTime);

    const tamagi = useTamagi.getState();
    if (tamagi.eventInProgress) {
    } else if (data.cpuEvents.length) {
      tamagi.addEvent(data.userEvents[0]);
      data.cpuEvents.shift();
    } else if (data.userEvents.length) {
      tamagi.addEvent(data.userEvents[0]);
      data.userEvents.shift();
    }
    tamagi.update(data.lastUpdate);
  },
  getNextCpuEvent: function (tamagi: Tamagi) {},
};

export default gameloop;
