/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)'],
        mono: ['var(--font-ibm-plex-mono)'],
        'sans-condensed': ['var(--font-ibm-plex-sans-condensed)'],
      },
      // boxShadow: {
      //   'solid-s': '6px 6px 0px gray-900',
      //   'solid-l': '10px 10px 0px gray-900',
      // },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
