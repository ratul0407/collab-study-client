/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
        cursive: ["Cedarville Cursive", "serif"],
      },
      backgroundImage: {
        "blue-sky-mobile": 'url("./assets/blue-sky-mobile.jpg")',
      },
    },
  },
  plugins: [daisyui],
};
