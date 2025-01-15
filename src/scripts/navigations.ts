import { EventsStateType, eventState } from "./state/events.state";

const navigationTextElement = document.querySelector(
  ".navigation-text"
) as HTMLElement;
const navigationPrevButtonElement = document.querySelector(
  ".navigation-prev-button"
) as HTMLElement;
const navigationNextButtonElement = document.querySelector(
  ".navigation-next-button"
) as HTMLElement;

const events = eventState.get();

function defineNavigationText(events: EventsStateType[]) {
  const activeEventIndex = events.findIndex((event) => event.isActive);

  const text = `0${activeEventIndex + 1}/0${events.length}`;

  navigationTextElement.textContent = text;
}

defineNavigationText(events);

navigationPrevButtonElement.addEventListener("click", () => {
  eventState.prevActiveEvent();
});

navigationNextButtonElement.addEventListener("click", () => {
  eventState.nextActiveEvent();
});

eventState.subscribe(defineNavigationText);
