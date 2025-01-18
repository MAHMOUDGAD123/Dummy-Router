import type { Config } from "tailwindcss";

const HEADER_HEIGHT = 65;
const NAV_HEIGHT = 55;
const NAV_MARGIN = 15;
const ITEMS_BG = "light-dark(#e5e5e5,#333333)";
const BTN_BG = "light-dark(#ffffff,#111111)";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,html}"],
  theme: {
    extend: {
      fontSize: {
        docsH1: "2rem",
        docsH2: "1.5rem",
        docsH3: "1.25rem",
        docsH4: "1rem",
        docstxt: "0.85rem",
        docsArrow: "2rem",
      },
      height: {
        header: `${HEADER_HEIGHT}px`,
        nav: `${NAV_HEIGHT}px`,
        top: `${HEADER_HEIGHT + NAV_HEIGHT}px`,
        main: `calc(100vh - ${HEADER_HEIGHT + NAV_HEIGHT + NAV_MARGIN}px)`,
      },
      minHeight: {
        main: `calc(100vh - ${HEADER_HEIGHT + NAV_HEIGHT + NAV_MARGIN}px)`,
        top: `${HEADER_HEIGHT + NAV_HEIGHT}px`,
      },
      maxHeight: {
        main: `calc(100vh - ${HEADER_HEIGHT + NAV_HEIGHT + NAV_MARGIN}px)`,
        top: `${HEADER_HEIGHT + NAV_HEIGHT}px`,
      },
      margin: {
        nav: `${NAV_MARGIN}px`,
      },
      transitionDuration: {
        global: "300ms",
      },
      screens: {
        _4xl: "1280px",
        _3xl: "1024px",
        _2xl: "950px",
        _xl: "850px",
        _lg: "550px",
        _md: "450px",
        _sm: "350px",
        _usm: "250px",
      },
      backgroundColor: {
        dodgerblue: "#1e90ff",
        dodgerblue_95: "#1e90ff95",
        dodgerblue_80: "#1e90ff80",
        dodgerblue_50: "#1e90ff50",
        dodgerblue_30: "#1e90ff30",
        dodgerblue_20: "#1e90ff20",
        header: ITEMS_BG,
        footer: ITEMS_BG,
        btn: BTN_BG,
      },
      colors: {
        dodgerblue: "#1e90ff",
        dodgerblue_95: "#1e90ff95",
        dodgerblue_80: "#1e90ff80",
        dodgerblue_50: "#1e90ff50",
        dodgerblue_30: "#1e90ff30",
        dodgerblue_20: "#1e90ff20",
        SecTextCol: "#777",
        drkTxtCol: "#ededed",
        litTxtCol: "#171717",
        seclitbg: "#eeeeee",
        secdrkbg: "#222222",
        itembg: "light-dark(#eee,#222)",
      },
      fontFamily: {
        roboMono: ["robotomono"],
        saira: ["saira"],
      },
      keyframes: {},
      animation: {
        settleX: "settle-x-gpu 300ms linear forwards",
        spinClockwise: "spin-clockwise 1s linear infinite",
        spinAntiClockwise: "spin-anticlockwise 1s linear infinite",
        fillWidth: "fill-width 100ms linear forwards",
        halfWidth: "half-width 1s linear forwards",
        fullWidth: "full-width 1s linear forwards",
        settleLeft: "settle-left 1s linear forwards",
        settleRight: "settle-right 1s linear forwards",
        settleTop: "settle-top 1s linear forwards",
        settleBottom: "settle-bottom 1s linear forwards",
        fadeIn: "fade-in 1s linear forwards",
        fadeIn_settle:
          "fade-in 1s linear forwards, settle-bottom 1s linear forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
