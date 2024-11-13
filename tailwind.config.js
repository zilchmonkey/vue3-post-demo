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
              background:
                "var(--main-bg) padding-box, var(--gradient-border) border-box",
            },
            "&:after": {
              animation: "bg-spin 3s linear infinite",
              content: '"hello"',
              background:
                "var(--gta-color) padding-box, var(--gradient-border) border-box",
              display: "inline-block",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "-2px",
              right: "-2px",
              // filter: "blur(50px)",
            },
          },
        },
        ["hover", "after"]
      );
    },
  ],
};
