import Swiper from "swiper";
import { Navigation, Manipulation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  speed: 700,
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  modules: [Navigation, Manipulation],
});
