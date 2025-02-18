import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryColor: "#00d2d3",
        secondaryColor: "#00d3c4",
        offWhite: "#f0f0f0",
        darkGray: "#0f172a",
        lightGray: "#ffffff",
        muted: "#4b5563",
        text: "#101c2c",
        red: "#ef4444",
        accentHover: "#e5ffff",
        "bg-secondary": "#e6fbfb",
      },
      backgroundImage: {
        "hero-pattern": "url('./assets/banner.jpg')",
        "footer-texture": "url('/img/footer-texture.svg')",
      },
    },
  },
  plugins: [daisyui],
};
