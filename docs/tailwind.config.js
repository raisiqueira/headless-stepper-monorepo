// const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
// const { join } = require('path');

module.exports = {
  content: [
    './components/**/*.js',
    './components/**/*.tsx',
    './nextra-theme-docs/**/*.js',
    './nextra-theme-docs/**/*.tsx',
    './nextra-theme-docs/**/*.css',
    './pages/**/*.md',
    './pages/**/*.mdx',
    './pages/**/*.tsx',
    './theme.config.js',
    './styles.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
