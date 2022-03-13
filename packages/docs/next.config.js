// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextra = require('nextra');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
};

module.exports = withNextra(nextConfig);
