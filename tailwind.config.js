/** @type {import('tailwindcss').Config} */
const { mauve, green, grass, blackA, red } = require("@radix-ui/colors");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...green,
        ...grass,
        ...blackA,
        ...red,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities(
        {
          ".customContainer": {
            border: "transparent solid 4px",
            animation: "bg-spin 2s linear infinite",
            "animation-play-state": "paused",
            background: "transparent",
            "&:hover, &:after": {
              "animation-play-state": "running",
            },
            "&:hover": {
              background:
                "conic-gradient(from var(--border-angle), transparent 25%, var(--bg-color)) border-box",
            },
            "&:hover:after": {
              content: '""',
              background:
                "conic-gradient(from var(--border-angle), transparent 25%, var(--bg-color)) border-box",
              display: "inline-block",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              right: "0",
              filter: "blur(30px)",
              "z-index": -1,
            },
          },
        },
        ["hover", "after"]
      );
    },
  ],
};
