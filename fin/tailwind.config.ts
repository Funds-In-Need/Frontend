import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Scans all relevant files in the src directory
    './components/**/*.{js,ts,jsx,tsx}', // Scans the components directory
  ],
  theme: {
    extend: {
      keyframes: {
        'smooth-glow': {
          '0%': { 'box-shadow': '0px 0px 5px 1px rgba(135, 206, 250, 0.5)', 'border-color': 'black' },
          '25%': { 'box-shadow': '5px 0px 10px 2px rgba(135, 206, 250, 0.5)', 'border-color': 'black' },
          '50%': { 'box-shadow': '0px 5px 10px 2px rgba(135, 206, 250, 0.5)', 'border-color': 'black' },
          '75%': { 'box-shadow': '-5px 0px 10px 2px rgba(135, 206, 250, 0.5)', 'border-color': 'black' },
          '100%': { 'box-shadow': '0px 0px 5px 1px rgba(135, 206, 250, 0.5)', 'border-color': 'black' },
        },
      },
      
      animation: {
        'smooth-glow': 'smooth-glow 3s ease-in-out infinite',
      },
      fontFamily: {
        blanka: ["Blanka", "sans-serif"],
        vcr: ["VCR_OSD_MONO", "monospace"],
      },
    },
  },
  
};

export default config;
