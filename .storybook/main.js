module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  core: {
    disableTelemetry: true,
  },
  // uncomment the property below if you want to apply some webpack config globally
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
