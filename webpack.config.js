const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
// const CopyPlugin = require('copy-webpack-plugin')
// WriteFilePlugin  needed only for webpack 3-4 and webpack dev-server
// const WriteFilePlugin = require('write-file-webpack-plugin')
// const json = require('./assets/manifest.json')

module.exports = {
  entry: [
    path.resolve(__dirname, './src/main/resources/templates/index.jsx'),
    path.resolve(__dirname, './src/main/resources/templates/index.scss'),
  ],
  output: {
    path: path.resolve(__dirname, './src/main/resources/static/built'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.json$/,
      //   loader: 'file-loader',
      //   type: 'javascript/auto',
      //   exclude: /node_modules/,
      //   options: {
      //     name: 'public/[name].[ext]',
      //     esModule: false,
      //   },
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
              ],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        // MiniCssExtractPlugin.loader для production
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico|json)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
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
    // index: "index.html"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/main/resources/templates/index.html',
      filename: 'index.html',
      favicon: './assets/favicon.ico',
      manifest: '/assets/manifest.json',
    }),
    new Dotenv({
      path: './.env',
    }),
    // new WriteFilePlugin(),
    // new CopyPlugin([
    //   {
    //     patterns: [
    //       {
    //         from: './src/main/resources/templates/manifest.json',
    //         to: './src/main/resources/static/built/manifest.json',
    //       },
    //     ],
    //   },
    // ]),
  ],
}
