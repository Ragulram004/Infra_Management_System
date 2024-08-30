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
      }
    },
  },
  plugins: [],
}

