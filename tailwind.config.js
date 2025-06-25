module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textAlign: ['rtl'],
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    textAlign: true,
    float: true,
    clear: true,
  },
}