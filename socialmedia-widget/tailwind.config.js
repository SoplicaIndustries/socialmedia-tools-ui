/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode instead of media queries
  theme: {
    extend: {
      colors: {
        primary: 'var(--sm-colors-primary)',
        secondary: 'var(--sm-colors-secondary)',
        success: 'var(--sm-colors-success)',
        error: 'var(--sm-colors-error)',
        warning: 'var(--sm-colors-warning)',
        info: 'var(--sm-colors-info)',
        background: 'var(--sm-colors-background)',
        surface: 'var(--sm-colors-surface)',
      },
      textColor: {
        'primary': 'var(--sm-colors-text-primary)',
        'secondary': 'var(--sm-colors-text-secondary)',
        'disabled': 'var(--sm-colors-text-disabled)',
      },
      backgroundColor: {
        'primary': 'var(--sm-colors-primary)',
        'secondary': 'var(--sm-colors-secondary)',
        'background': 'var(--sm-colors-background)',
        'surface': 'var(--sm-colors-surface)',
      },
      boxShadow: {
        sm: 'var(--sm-shadows-sm)',
        md: 'var(--sm-shadows-md)',
        lg: 'var(--sm-shadows-lg)',
      },
      borderRadius: {
        sm: 'var(--sm-borderRadius-sm)',
        md: 'var(--sm-borderRadius-md)',
        lg: 'var(--sm-borderRadius-lg)',
        full: 'var(--sm-borderRadius-full)',
      },
      transitionDuration: {
        fast: 'var(--sm-transitions-fast)',
        normal: 'var(--sm-transitions-normal)',
        slow: 'var(--sm-transitions-slow)',
      },
      borderWidth: {
        '3': '3px',
      },
      gridAutoRows: {
        'calendar': 'minmax(100px, auto)',
      },
    },
  },
  plugins: [],
}
