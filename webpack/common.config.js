const path = require('path');
const webpack = require('webpack');

// webpack plugins
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');

module.exports = {

  entry: {
    'qnimate': './src/qnimate.js'
  },

  resolve: {

    extensions: ['', '.js', '.css'],

    root: path.resolve(__dirname, 'src/client'),

    modulesDirectories: ['node_modules']

  },

  module: {

    loaders: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }

    ]

  },

  plugins: [
    new OccurenceOrderPlugin(true)
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
