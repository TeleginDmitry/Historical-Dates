import { EventsStateType, eventState } from "./state/events.state";
import { gsap } from "gsap";

const startYearElement = document.querySelector(".start-year") as HTMLElement;
const endYearElement = document.querySelector(".end-year") as HTMLElement;

function defineYears(events: EventsStateType[]) {
  let minYear = Infinity;
  let maxYear = -Infinity;

  events.forEach((event) => {
    if (!event.isActive) return;

    const eventMinYear = Math.min(...event.dates.map((date) => date.year));
    const eventMaxYear = Math.max(...event.dates.map((date) => date.year));

    minYear = Math.min(minYear, eventMinYear);
    maxYear = Math.max(maxYear, eventMaxYear);
  });

  gsap.to([startYearElement, endYearElement], {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      startYearElement.textContent = minYear.toString();
      endYearElement.textContent = maxYear.toString();

      gsap.fromTo(
        startYearElement,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );

      gsap.fromTo(
        endYearElement,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" } // Задержка появления
      );
    },
  });
}

const events = eventState.get();

defineYears(events);

eventState.subscribe(defineYears);
