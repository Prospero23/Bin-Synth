/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-page": "url(/background.png)",
      },
      animation: {
        fadeOut: "fadeOut 2500ms forwards",
      },
      keyframes: {
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
            display: "none !important",
          },
        },
      },
      screens: {
        "short-and-wide": {
          raw: "(min-width: 790px) and (max-height: 580px)",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
