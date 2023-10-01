/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        foreground: "var(--foreground)",
        "accent-slate-blue": "var(--accent-slate-blue)",
        "accent-blue": "var(--accent-blue)",
      },
      fontFamily: {
        Nunito: "Nunito, sans-serif",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        popUp: {
          "0%": {
            opacity: 0,
            transform: "translate(0, -10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0,0,0)",
          },
        },
        fadeIn: {
          "100%": {
            opacity: 1,
          },
        },
        slideIn: {
          to: {
            transform: "translate3d(0,0,0)",
          },
        },
        scaleUp: {
          "40%,70%": {
            transform: "scale(1.125)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        popUp: "popUp .3s forwards",
        fadeIn: "fadeIn .4s forwards",
        slideIn: "slideIn .3s forwards",
        scaleUp: "scaleUp 1s",
      },
      gridTemplateColumns: {
        dropdown: "230px minmax(230px, 1fr) 230px",
      },
    },
  },

  plugins: [],
};
