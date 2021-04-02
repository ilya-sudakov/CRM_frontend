const path = require('path');

module.exports = {
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        Components: path.resolve(__dirname, '../src/components'),
        Utils: path.resolve(__dirname, '../src/utils'),
        Assets: path.resolve(__dirname, '../assets'),
      },
    },
  }),
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
};
