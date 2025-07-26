/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#38BDF8',
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            accent: '#38BDF8'
          }
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#F1F5F9',
          accent: '#3B82F6',
          text: {
            primary: '#1E293B',
            secondary: '#64748B',
            accent: '#3B82F6'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
} 