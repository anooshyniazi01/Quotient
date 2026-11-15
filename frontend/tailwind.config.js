/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14213D',
          2: '#1B2C52',
          3: '#2B3D69',
          4: '#4A5C86',
          5: '#8793B0',
        },
        amber: {
          DEFAULT: '#FCA311',
          2: '#FFD27A',
          3: '#FFEFCB',
          4: '#FFF8E8',
          D: '#B36A00',
        },
        line: {
          DEFAULT: '#E5E5E5',
          2: '#EEEEEC',
        },
        bg2: '#F5F5F3',
        mut: {
          DEFAULT: '#5C667D',
          2: '#8A92A5',
        },
        ok: {
          DEFAULT: '#1F8A5B',
          bg: '#E6F4EC',
        },
        bad: {
          DEFAULT: '#C9382E',
          bg: '#FBE9E7',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        'desktop': '1180px',
        'tablet': '940px',
        'nav-collapse': '820px',
        'mobile': '520px',
      },
    },
  },
  plugins: [],
}
