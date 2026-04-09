import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'unbox-green': '#10b981',
        'unbox-red': '#ef4444',
        'unbox-amber': '#f59e0b',
        'unbox-dark': '#0a0a0a',
        'unbox-glass': 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
