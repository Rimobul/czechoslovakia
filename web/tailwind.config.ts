import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: {
          link: '#0066CC',
          error: '#CC0000',
        },
        border: '#E0E0E0',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      maxWidth: {
        'content': '800px',
        'narrow': '600px',
      },
    },
  },
  plugins: [],
}
export default config
