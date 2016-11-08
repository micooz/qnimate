const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(webpackCommon, {

  debug: true,

  devtool: 'inline-source-map',

  output: {

    path: path.resolve(__dirname, '../docs'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js'

  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'qnimate demo',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    })
  ],

  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

});
