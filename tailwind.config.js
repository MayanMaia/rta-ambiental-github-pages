/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f9f0',
          100: '#dcf0dc',
          200: '#b8e0b8',
          300: '#85c785',
          400: '#4da84d',
          500: '#2d8a2d',
          600: '#1e6e1e',
          700: '#185618',
          800: '#154315',
          900: '#0f300f',
        },
        secondary: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfd',
          300: '#7bbffb',
          400: '#369cf6',
          500: '#0d7fe7',
          600: '#0161c4',
          700: '#024da0',
          800: '#064284',
          900: '#0a376d',
        },
        neutral: {
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem',  { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['3rem',    { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['1.875rem',{ lineHeight: '1.25', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.06)',
        nav: '0 2px 12px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2rem',
        },
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
