/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/index.css"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
        cursive: ["Cedarville Cursive", "serif"],
      },
      backgroundImage: {
        "blue-sky": 'url("./assets/blue-sky.jpg")',
        "blue-horizon": 'url("./assets/blue-horizon.jpg")',
        banner: 'url("./assets/banner.jpg")',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "black"],
  },
};
