const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
const typography = require("@tailwindcss/typography");


/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
    flowbite.content()
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2rem", // Størrelse (f.eks. 40px)
              letterSpacing: "0.05em",
            },
          },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    typography
  ],
});
