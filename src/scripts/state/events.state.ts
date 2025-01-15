import { events } from "../../configs/events.config";
import { EventType } from "../../types/event.types";
import { compareObjects } from "../../utils/compareObjects";

type CallbackListenerType = (state: EventsStateType[]) => void;

export interface EventsStateType extends EventType {
  isActive: boolean;
}

class EventsState {
  private state: EventsStateType[] = events.map((event, index) => {
    return {
      ...event,
      dates: event.dates.sort((a, b) => a.year - b.year),
      isActive: index === 0,
    };
  });
  private listeners: CallbackListenerType[] = [];

  get(): EventsStateType[] {
    return this.state;
  }

  set(callback: (state: EventsStateType[]) => EventsStateType[]) {
    const newState = callback(this.state);

    if (compareObjects(this.state, newState)) return;

    this.state = newState;

    this.notify();
  }

  subscribe(callback: CallbackListenerType) {
    if (this.listeners.includes(callback)) return;

    this.listeners.push(callback);
  }

  unsubscribe(callback: CallbackListenerType) {
    if (!this.listeners.includes(callback)) return;

    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  nextActiveEvent() {
    this.set((state) => {
      const activeEventIndex = state.findIndex((event) => event.isActive);
      const nextEventIndex = (activeEventIndex + 1) % state.length;

      return state.map((event, index) => ({
        ...event,
        isActive: index === nextEventIndex,
      }));
    });
  }

  prevActiveEvent() {
    this.set((state) => {
      const activeEventIndex = state.findIndex((event) => event.isActive);
      const prevEventIndex =
        (activeEventIndex - 1 + state.length) % state.length;

      return state.map((event, index) => ({
        ...event,
        isActive: index === prevEventIndex,
      }));
    });
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const eventState = new EventsState();
