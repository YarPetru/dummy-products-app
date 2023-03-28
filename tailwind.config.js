/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      // mobile: '640px',500
      // tablet: '960px',800
      // album: '1280px',1200
      desktop: '1440px',
    },
    colors: {
      transparent: 'transparent',
      dark: '#2F2F2E',
      black: '#111110',
      'black-02': 'rgba(17, 17, 16, 0.02)',
      'black-10': 'rgba(17, 17, 16, 0.10)',
      'black-15': 'rgba(17, 17, 16, 0.15)',
      grey: {
        light: '#F2F2F4',
        medium: '#939393',
        dark: '#2F2F2E',
      },
      white: '#FFF',
      'white-05': 'rgba(255, 255, 255, 0.05)',
      'white-10': 'rgba(255, 255, 255, 0.1)',
      'white-15': 'rgba(255, 255, 255, 0.15)',
      'white-20': 'rgba(255, 255, 255, 0.20)',

      blue: {
        accent: '#158FFF',
        light: '#D4DFFF',
        5: 'rgba(21, 143, 255, 0.05)',
        10: 'rgba(21, 143, 255, 0.1)',
      },
      yellow: {
        accent: '#E3AD09',
        light: '#F2C94C',
      },
      green: '#3DB613',
    },
    fontSize: {
      xs: ['14px', { lineHeight: '20px', fontWeight: '400' }],
      sm: ['16px', { lineHeight: '24px', fontWeight: '400' }],
      lg: ['18px', { lineHeight: '27px', fontWeight: '800' }],
      xl: ['20px', { lineHeight: '30px', fontWeight: '700' }],
      '2xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
      '3xl': ['32px', { lineHeight: '40px', fontWeight: '800' }],
      '4xl': ['40px', { lineHeight: '54px', fontWeight: '800' }],
      '5xl': ['48px', { lineHeight: '56px', fontWeight: '800' }],
    },
    boxShadow: {
      card: '0px 66px 110px rgba(0, 0, 0, 0.05)',
      'test-card': '0px 7px 55px rgba(3, 41, 75, 0.1)',
      cta: '0px 3px 55px rgba(3, 41, 75, 0.1)',
      'course-card': '4px 12px 24px rgba(13, 13, 13, 0.2)',
    },
    fontFamily: {},
    container: {
      center: true,
    },
    extend: {
      // maxWidth: {
      //   '2xl': '632px',
      //   // '3xl': '652px',
      // },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '18px',
        xl: '24px',
      },
      transitionDuration: {
        DEFAULT: '333ms',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s infinite',
      },
    },
  },
  plugins: [],
};
