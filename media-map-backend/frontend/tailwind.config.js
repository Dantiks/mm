const flowbite = require("flowbite-react/tailwind");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            fontFamily: {
                dmSans: ['DM Sans', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                nunito: ['Nunito Sans', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            screens: {
                'sm': '240px', // кастомный брейкпоинт
            },
            colors: {
                button: "#133E87",
                mainTheme: "#133E87",
                lightBlue: "#E8F3FF",
                burgundy: "#9A0000",
                yellow: "#FFB319",
                darkBlue: "#133E87",
            },
            keyframes: {
                rotateY: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(360deg)' },
                },
            },
            animation: {
                'rotate-y': 'rotateY 3.5s infinite linear',
            },
            backgroundImage: {
                'bg-icons': "url('../public/bg-icon-200.png')",
            },
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}