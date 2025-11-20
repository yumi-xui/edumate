 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,jsx}"],
   theme: {
     extend: {
       colors: {
         'edumate-purple': '#E8D5FF',
         'edumate-purple-dark': '#D4B3FF',
         'edumate-green': '#CBD83B',
         'edumate-green-light': '#E8F0A8',
         // Logo colors
         'logo-green': '#B8E6B8',
         'logo-purple': '#D4B3FF',
         'logo-cream': '#F5F5DC',
       },
       fontFamily: {
         'serif-display': ['"DM Serif Display"', 'serif'],
       },
     },
   },
   plugins: [],
 }