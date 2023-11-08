/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://img.freepik.com/premium-vector/blue-pastel-colorful-gradient-background-templates-design-colorful-concept-light-blue-pink-yellow_293525-1102.jpg')",

        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
