/** @type {import('tailwindcss').Config} */
module.exports = {
  // ! Add just in time mode
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // ! Add Vue here
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f59e42",
        "secondary": "#e3a96b"
      }, 
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    // screens: {
    //   sm:"640px",
    //   md: "768px",
    // }
  },
  plugins: [],
}
