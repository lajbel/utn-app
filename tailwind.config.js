/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/client/**/*.{js,ts,jsx,tsx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["cupcake", "halloween"],
    },
    plugins: [
        /** @type {import("daisyui").Config} */
        require("daisyui"),
    ],
};
