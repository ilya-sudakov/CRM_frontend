const path = require('path');

module.exports = {
  webpackFinal: (config) => {
    // Replaces the webpack rule that loads SVGs as static files to leave out SVG files for us to handle
    const indexOfRuleToRemove = config.module.rules.findIndex((rule) =>
      rule.test.toString().includes('svg'),
    );
    let temp = config.module.rules;
    temp.splice(indexOfRuleToRemove, 1, {
      test: /\.(eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
        esModule: false,
      },
    });
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...temp,
          {
            test: /\.(png|svg|jpg|gif|ico)$/,
            exclude: /\.inline.svg$/,
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              esModule: false,
            },
          },
          {
            test: /\.inline.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          Components: path.resolve(__dirname, '../src/components'),
          API: path.resolve(__dirname, '../src/utils/API'),
          Utils: path.resolve(__dirname, '../src/utils'),
          Assets: path.resolve(__dirname, '../assets'),
        },
      },
    };
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
};
