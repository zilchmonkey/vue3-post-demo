/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities(
        {
          ".customContainer": {
            border: "transparent solid 2px",
            animation: "bg-spin 3s linear infinite",
            "animation-play-state": "paused",
            background: "transparent",
            "&:hover, &:after": {
              "animation-play-state": "running",
            },
            "&:hover": {
              background:
                "conic-gradient(from var(--border-angle), transparent 25%, var(--gta-color)) border-box",
            },
            "&:hover:after": {
              content: '""',
              background:
                "conic-gradient(from var(--border-angle), transparent 25%, var(--gta-color)) border-box",
              display: "inline-block",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              right: "0",
              filter: "blur(20px)",
              "z-index": -1,
            },
          },
        },
        ["hover", "after"]
      );
    },
  ],
};
