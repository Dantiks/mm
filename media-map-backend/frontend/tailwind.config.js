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
                mono: ['JetBrains Mono', 'monospace'],
                // font-serif резолвился в системный serif — на разных машинах
                // заголовки новостей выглядели по-разному.
                serif: ['Merriweather', 'Georgia', 'serif'],
            },
            screens: {
                'sm': '240px', // кастомный брейкпоинт
            },
            colors: {
                // Legacy tokens remapped to the Figma palette so existing
                // components adopt the redesign automatically.
                button: "#0b2545",
                mainTheme: "#0b2545",
                lightBlue: "#E8F3FF",
                burgundy: "#9A0000",
                yellow: "#e8b84b",
                darkBlue: "#0b2545",
                // Figma design system (mediamap.kg redesign)
                navy: "#0b2545",
                navyCard: "#0f2e58",
                gold: "#e8b84b",
                goldDeep: "#b8871f",
                cream: "#f7f4ec",
                creamPill: "#fbf1da",
                lineLight: "#ece7da",
                mutedNavy: "#9fb0c7",
                ink: "#14181a",
                slateBody: "#6e7979",
                statUp: "#ba1a1a",
                statDown: "#2f9e5b",
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