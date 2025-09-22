/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'wooqoo-primary': '#FF8B45', // Changed from teal to orange from logo
        'wooqoo-coral': '#FF7A6E',
        'paper': '#FCFEFF',
        'surface': '#FFFFFF',
        'text-muted': '#6B7280',
        'text-primary': '#0F172A',
        'success': '#16A34A',
        'error': '#DC2626',
        
        dark: {
          background: '#0F172A', // Primary Text as BG
          surface: '#1E293B',    // Slate 800
          'text-primary': '#F8FAFC', // Slate 50
          'text-muted': '#94A3B8',   // Slate 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.05)',
        'md': '0 8px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
