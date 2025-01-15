import { EventsStateType, eventState } from "./state/events.state";
import gsap from "gsap";

const circle = document.querySelector("#circle") as HTMLElement;

function createChapterElements(
  circleElement: HTMLElement,
  events: EventsStateType[]
) {
  const radius = circleElement.offsetWidth / 2; // Радиус круга
  const centerX = circleElement.offsetWidth / 2; // Центр круга (X)
  const centerY = circleElement.offsetWidth / 2; // Центр круга (Y)

  events.forEach((event, index) => {
    const chapterElement = document.createElement("div");

    chapterElement.classList.add(
      "chapter",
      "absolute",
      "-translate-x-1/2",
      "-translate-y-1/2"
    );

    if (event.isActive) {
      chapterElement.classList.add("active");
    }

    chapterElement.dataset.name = event.name;

    const angle = (index / events.length) * 2 * Math.PI; // Угол в радианах
    const x = Math.cos(angle) * radius + centerX;
    const y = Math.sin(angle) * radius + centerY;

    chapterElement.style.left = `${x}px`;
    chapterElement.style.top = `${y}px`;

    chapterElement.innerHTML = `
            <div
              class="relative opacity-0 hover:opacity-100 duration-300 ease-linear"
            >
              <button
                class="size-10 md:size-12 rounded-full border border-secondary bg-primary"
              >
                <span class="text-third text-responsive-primary">${
                  index + 1
                }</span>
              </button>
              <span
                class="absolute top-1/2 left-16 -translate-y-1/2 pointer-events-none text-third font-bold text-responsive-primary"
>${event.name}</span
              >
            </div>
          `;

    circleElement.appendChild(chapterElement);
  });

  gsap.from(".chapter", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    ease: "power4.out",
  });
}

const events = eventState.get();

createChapterElements(circle, events);

function changeActiveChapter(events: EventsStateType[]) {
  const activeChapter = events.find((event) => event.isActive);

  if (!activeChapter) return;

  const chapterElements = document.querySelectorAll(
    ".chapter"
  ) as NodeListOf<HTMLElement>;

  chapterElements.forEach((chapter) => {
    chapter.classList.remove("active");
  });

  chapterElements.forEach((chapter) => {
    const chapterName = chapter.dataset.name as string;

    if (chapterName === activeChapter.name) {
      chapter.classList.add("active");
    }
  });
}

eventState.subscribe(changeActiveChapter);

function resizeHandler(circleElement: HTMLElement) {
  const radius = circleElement.offsetWidth / 2; // Радиус круга
  const centerX = circleElement.offsetWidth / 2; // Центр круга (X)
  const centerY = circleElement.offsetWidth / 2; // Центр круга (Y)

  const chapterElements = circleElement.querySelectorAll(
    ".chapter"
  ) as NodeListOf<HTMLElement>;

  chapterElements.forEach((chapterElement, index) => {
    const angle = (index / events.length) * 2 * Math.PI; // Угол в радианах
    const x = Math.cos(angle) * radius + centerX;
    const y = Math.sin(angle) * radius + centerY;

    chapterElement.style.left = `${x}px`;
    chapterElement.style.top = `${y}px`;
  });
}

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const circleElement = entry.target as HTMLElement;

    resizeHandler(circleElement);
  });
});

resizeObserver.observe(circle);

const chapters = document.querySelectorAll(
  ".chapter"
) as NodeListOf<HTMLElement>;

chapters.forEach((chapter) => {
  chapter.addEventListener("click", () => {
    eventState.set((state) => {
      return state.map((event) => ({
        ...event,
        isActive: event.name === chapter.dataset.name,
      }));
    });
  });
});
