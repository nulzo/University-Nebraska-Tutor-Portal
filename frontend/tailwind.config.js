/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    themes: [
        {
          UNO_theme: {
           "primary": "#BCBBBA",
           "secondary": "#D71920",
           "accent": "#8b1015",
           "neutral": "#2a323c",
           "base-100": "#1d232a",
           "info": "#d37377",
           "success": "#36d399",
           "warning": "#fbbd23",
           "error": "#fbbd23",
          },
        },
      ],
  },
  plugins: [require("daisyui")],
}

