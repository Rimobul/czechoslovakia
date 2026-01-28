import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark primary theme (from oldweb Webflow design)
        neutral: {
          primary: '#0e0d0c',    // Dark background
          secondary: '#151515',  // Secondary dark background
          inverse: '#ebebeb',    // Light text on dark
        },
        accent: {
          primary: '#d3433b',         // Red accent color
          'primary-hover': '#de736d', // Red hover state
          secondary: '#f34f48',       // Lighter red for text links
        },
        text: {
          primary: '#ebebeb',    // Primary text (light on dark)
          secondary: 'rgba(235, 235, 235, 0.6)', // Muted text
          inverse: '#0e0d0c',    // Dark text on light backgrounds
        },
        border: {
          primary: 'rgba(235, 235, 235, 0.1)',
          secondary: 'rgba(235, 235, 235, 0.2)',
        },
      },
      fontFamily: {
        // Modern sans-serif font stack (Jost from oldweb)
        sans: ['Jost', 'Inter', 'Helvetica Neue', 'sans-serif'],
        heading: ['Jost', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Typography scale from oldweb
        'display': ['5.61rem', { lineHeight: '1.04', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h1': ['4.21rem', { lineHeight: '1.04', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h2': ['2.37rem', { lineHeight: '1.04', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h3': ['1.78rem', { lineHeight: '1.04', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h4': ['1.33rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h5': ['1rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body-xl': ['1.5rem', { lineHeight: '1.6' }],
        'body-lg': ['1.13rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.88rem', { lineHeight: '1.6' }],
        'eyebrow': ['0.9rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
      },
      spacing: {
        // Consistent spacing scale
        '0.25x': '0.25rem',
        '0.5x': '0.5rem',
        '0.75x': '0.75rem',
        '1x': '1rem',
        '1.25x': '1.25rem',
        '1.5x': '1.5rem',
        '2x': '2rem',
        '3x': '3rem',
        '4x': '4rem',
        '5x': '5rem',
        '6x': '6rem',
        '7x': '7rem',
        '8x': '8rem',
      },
      maxWidth: {
        'container': '1280px',
        'container-lg': '1440px',
        'container-sm': '1000px',
        'content': '800px',
        'narrow': '600px',
      },
      borderRadius: {
        'card': '0px',     // Sharp edges for modern look
        'button': '0px',   // Sharp buttons
        'input': '0px',    // Sharp inputs
      },
      boxShadow: {
        'card': 'none',
        'card-hover': 'none',
      },
    },
  },
  plugins: [],
}
export default config
