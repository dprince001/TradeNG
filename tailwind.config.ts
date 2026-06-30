import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        'primary': '#FF4304',
        'text-primary': '#1D1E20',
        'text-secondary': '#8F959E',
        'text-tertiary': '#4B5563',
      },
    },
  },
  plugins: [],
}
export default config
