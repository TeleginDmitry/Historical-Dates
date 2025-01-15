import gsap from "gsap";
import { EventsStateType, eventState } from "./state/events.state";
import { swiper } from "./swiper";

function createSwiperSlides(events: EventsStateType[]) {
  events.forEach((event) => {
    if (!event.isActive) return;

    event.dates.forEach((date) => {
      swiper.appendSlide(`
        <div class="swiper-slide max-w-[180px] sm:max-w-none cursor-default">
          <div class="flex flex-col gap-2">
             <h2 class="text-primary text-responsive-primary font-bold">${date.year}</h2>
              <p class="text-third text-responsive-small line-clamp-4">${date.description}</p>
          </div>
        </div>
        `);
    });
  });

  gsap.from(".swiper-slide", {
    opacity: 0,
    y: 30,
    stagger: {
      amount: 0.2,
    },
    ease: "power2.out",
  });
}

const events = eventState.get();

createSwiperSlides(events);

eventState.subscribe((events) => {
  gsap.to(".swiper-slide", {
    opacity: 0,
    y: 30,
    stagger: {
      amount: 0.2,
    },
    ease: "power2.out",
    onComplete: () => {
      swiper.removeAllSlides();
      createSwiperSlides(events);
    },
  });
});
