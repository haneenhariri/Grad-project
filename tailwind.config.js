/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/public/BG (11).png')",
      },
      fontFamily : 
      {
        'Tajawal': "Be Vietnam Pro",
      
      },
      colors: {
        'btn': '#9C4DF4',
        'primary': '#0A033C',
        'Orange/75': '#FFCA80',
        'Orange/80': '#FFD599',
        'Orange/90': '#FFEACC',
        'Orange/95': '#FFF4E5',
        'Orange/97': '#FFF9F0', 
        'Orange/99': '#FFFDFA',
        'Orange/95': '#FFF4E5',
        'White/100': '#FFFFFF',
        'White/95': '#F1F1F3',
        'White/97': '#F7F7F8',
        'White/99': '#FCFCFD',
        'bg-primary-color' : '#F7F5FA',
        'Grey/10': '#1A1A1A',
        'Grey/20': '#333333',
        'Grey/30': '#4C4C4D',
        'Grey/35': '#59595A',
        'Grey/40': '#656567',
        'Grey/60': '#98989A',
        'Grey/70': '#B3B3B3',
      },
      spacing: {
        '4.5' : '18px',
        '7.5': '30px',
        '5px': '5px',
        '60': '60px',
        '50' : '50px',
        '154': '154px',
        '63': '63px',
        '62': '62px',
        '30px': '30px',
        '100px': '100px',
        '72px': '72px',
        'paddingBottom150': '150px',
        'paddingBottom100': '100px',
        'paddingBottom50': '50px',
        'largeScreen': '1597px'
      },
      screens: {
        'tablet': '992px',
        
        // 'tablet': '640px',


        'laptop': '1200px',


        'desktop': '1441px',
        // => @media (min-width: 1280px) { ... }
      },
      keyframes: {
        scrollContinuous: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }, // نقل كامل الحاوية
        },
      },
      animation: {
        scrollContinuous: 'scrollContinuous 10s linear infinite', // حركة مستمرة
      },
      
    },
  },
  plugins: [],
  
}

