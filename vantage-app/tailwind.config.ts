import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        itq: '#2F4A3C',
        bronze: '#9A7B4F',
        olive: '#6C7D3C',
        terra: '#B26540',
        cream: '#FAF8F3',
        sand: '#EEF1EC',
        ink: '#1F2421',
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
