/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    plugins: [require("daisyui"), require('@tailwindcss/typography')],
    daisyui: {
        themes: [
            {
                UNO_theme: {

                    "primary": "#B7283D",

                    "secondary": "#1334D8",

                    "accent": "#4B1684",

                    "neutral": "#221A23",

                    "base-100": "#F6F7F8",

                    "info": "#2B5ED4",

                    "success": "#1D865E",

                    "warning": "#E8C721",

                    "error": "#E66B5B",
                },
            },
        ],
    },
}

