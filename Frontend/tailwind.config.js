/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background : '#EEF2F6', 
        primary :'#313E50',
        border:'#9F9F9F',
        error : '#FB7777', 
        success : '#62C370',
      },
      fontFamily:{
        regular : ['Nunito Sans']
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

