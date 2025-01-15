import { EventsStateType, eventState } from "./state/events.state";

const paginationElement = document.querySelector(".pagination") as HTMLElement;

const events = eventState.get();

function createPagination() {
  events.forEach((event) => {
    const paginationItem = document.createElement("div");
    paginationItem.classList.add("pagination-item");
    paginationItem.dataset.name = event.name;
    paginationElement.appendChild(paginationItem);
  });
}

createPagination();

const paginationItems = document.querySelectorAll(
  ".pagination-item"
) as NodeListOf<HTMLElement>;

paginationItems.forEach((paginationItem) => {
  paginationItem.addEventListener("click", () => {
    eventState.set((state) => {
      return state.map((event) => ({
        ...event,
        isActive: event.name === paginationItem.dataset.name,
      }));
    });
  });
});

function defineActivePaginationItem(events: EventsStateType[]) {
  paginationItems.forEach((paginationItem) => {
    paginationItem.classList.remove("active");
  });

  paginationItems.forEach((paginationItem) => {
    events.forEach((event) => {
      if (paginationItem.dataset.name === event.name && event.isActive) {
        paginationItem.classList.add("active");
      }
    });
  });
}

defineActivePaginationItem(events);

eventState.subscribe(defineActivePaginationItem);
