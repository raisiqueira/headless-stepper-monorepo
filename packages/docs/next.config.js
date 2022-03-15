// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextra = require('nextra');
const withTM = require('next-transpile-modules')(['headless-stepper']);

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_contentDump: true,
};

module.exports = withNextra(withTM(nextConfig));
