import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all relevant files in the src directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scans the components directory
  ],
  theme: {
    extend: {
      keyframes: {
        "smooth-glow": {
          "0%": {
            "box-shadow": "0px 0px 5px 1px rgba(135, 206, 250, 0.5)",
            "border-color": "black",
          },
          "25%": {
            "box-shadow": "5px 0px 10px 2px rgba(135, 206, 250, 0.5)",
            "border-color": "black",
          },
          "50%": {
            "box-shadow": "0px 5px 10px 2px rgba(135, 206, 250, 0.5)",
            "border-color": "black",
          },
          "75%": {
            "box-shadow": "-5px 0px 10px 2px rgba(135, 206, 250, 0.5)",
            "border-color": "black",
          },
          "100%": {
            "box-shadow": "0px 0px 5px 1px rgba(135, 206, 250, 0.5)",
            "border-color": "black",
          },
        },

        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },

        "gradient-animation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },

        growShrink: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },

        slowBounce: {
          "0%, 100%": {
            transform: "translateY(-20%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },

        blink: {
          "25%": { opacity: "0.5" },
          "50%": { opacity: "0" },
          "75%": { opacity: "0.5" },
        },
      },

      animation: {
        "smooth-glow": "smooth-glow 3s ease-in-out infinite",
        "gradient-bg": "gradient-animation 10s ease infinite",
        "slide-left": "slideLeft 20s linear infinite",
        growShrink: "growShrink 3s ease-in-out infinite",
        "slow-bounce": "slowBounce 7s infinite",
        blink: "blink 4s linear infinite",
      },
      fontFamily: {
        blanka: ["Blanka", "sans-serif"],
        vcr: ["VCR_OSD_MONO", "monospace"],
      },
    },
  },
};

export default config;
