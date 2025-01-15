/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#3877EE",
        secondary: "#EF5DA8",
        third: "#42567A",
      },
      backgroundImage: {
        "blue-pink": "linear-gradient(to bottom, #3877EE, #EF5DA8)",
      },
      borderColor: {
        primary: "#E3E6ED",
        secondary: "#303E5880",
        third: "#C7CDD9",
      },
      backgroundColor: {
        primary: "#F4F5F9",
      },

      fontSize: {
        "responsive-small": [
          "clamp(0.75rem, 1.5vw, 1rem)",
          { lineHeight: "1.2" },
        ],
        "responsive-primary": [
          "clamp(1rem, 2.5vw, 1.5rem)",
          { lineHeight: "1.3" },
        ],
        "responsive-secondary": [
          "clamp(1.5rem, 4vw, 2rem)",
          { lineHeight: "1.4" },
        ],
        "responsive-third": ["clamp(2rem, 6vw, 3rem)", { lineHeight: "1.5" }],
        "responsive-fourth": ["clamp(3rem, 8vw, 4rem)", { lineHeight: "1.6" }],
        "responsive-big": ["clamp(3rem, 15vw, 10rem)", { lineHeight: "1.8" }],
      },
    },
  },
  plugins: [],
};
