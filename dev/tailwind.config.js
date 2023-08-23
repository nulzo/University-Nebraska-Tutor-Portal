/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["../templates/**/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
            portal:
                {
                "primary": "#D71920",
                "secondary": "#BCBBBA",
                "accent": "#D32D08",
                "neutral": "#636568",
                "base-100": "#ffffff",
                "info": "#97CDF2",
                "success": "#43EA80",
                "warning": "#FACC15",
                "error": "#F96675",
            },
        },
            "dark",
        ],
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
}
