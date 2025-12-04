/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "fill-white",
    "fill-red-500",
    "fill-blue-400",
    "fill-gray-500",
    "fill-yellow-500",
    "fill-purple-500",
    "fill-orange-400",
    "fill-gray-400",
    "fill-green-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
