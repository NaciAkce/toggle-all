const { resolve, sep } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-viewport',
    '@whitespace/storybook-addon-html',
    'storybook-addon-preview/register',
  ],
  managerWebpack: async (config, options) => {
    // update config here

    return config;
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: resolve(__dirname, '../'),
    });
    return config;
  },
  core: {
    builder: 'webpack5',
  },
  reactOptions: {
    fastRefresh: false,
  },
  features: {
    stroyStoreV7: true,
  },
};
