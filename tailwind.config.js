// tailwind.config.js

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        spoqa: ['"Spoqa Han Sans"', 'sans-serif'],
        Cafe24Shiningstar: ['Cafe24Shiningstar'],
      },
      spacing: {
        312: '19.5rem',
        232: '14.5rem',
        70: '4.375rem',
      },
      colors: {
        background: {
          default: '#dfdfe0', // 수정된 부분: 'eo' 대신 'e0'
          light: '#f7f7f8',
        },
        interactive: {
          default: '#989ba2',
          light: '#f4f4f5',
        },
        status: {
          success: '#00bf40',
          warning: '#ff9200',
          error: '#ff4242',
        },
        dimmer: {
          bg: 'rgba(23, 23, 25, 0.52)', // 171719 with 52% opacity
        },
        line: {
          lightest: '#f4f4f5',
          lighter: '#e8e8ea',
          light: '#e0e0e2',
        },
        primary: {
          lightest: '#0066ff',
          lighter: '#005eeb',
          light: '#0054d1',
        },
      },
    },
  },
  plugins: [],
};
