/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        orange: "#fd1803",
        deepOrange: "#ca1302",
        raisinBlack: "#202020",
      },
      backgroundColor: {
        orange: "#fd1803",
        deepOrange: "#ca1302",
        raisinBlack: "#202020",
      },
      backgroundImage: {
        loginbanner: "url('/src/Assets/login-banner.jpg')",
        slider1: "url('/src/Assets/home-bg-1-min.jpg')",
        slider2: "url('/src/Assets/home-bg-2-min.jpg')",
        slider3: "url('/src/Assets/home-bg-3-min.jpg')",
      },
      height: {
        98: "26rem",
      },

      minHeight: {
        90: "calc(100vh - 10vh)",
      },
    },
  },
  plugins: [require("daisyui")],
};
