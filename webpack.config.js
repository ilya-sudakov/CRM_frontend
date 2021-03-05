const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: [
    path.resolve(__dirname, './src/templates/index.jsx'),
    path.resolve(__dirname, './src/templates/index.scss'),
  ],
  output: {
    path: path.resolve(__dirname, './src/static/built'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|ico|json)$/,
        exclude: /\.inline.svg$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.inline.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.s?css$/,
        use: [
          isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: '/static/',
    watchContentBase: true,
    inline: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.IgnorePlugin(/cptable/),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/templates/index.html',
      filename: 'index.html',
      favicon: './src/static/built/assets/favicon.ico',
      manifest: './src/static/built/assets/manifest.json',
    }),
    new Dotenv({
      path: './.env',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
    },
    extensions: ['.js', '.scss', 'jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Assets: path.resolve(__dirname, 'assets'),
    },
  },
  externals: [{ './cptable': 'var cptable', './jszip': 'jszip' }],
};
