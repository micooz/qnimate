const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

// webpack plugins
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(webpackCommon, {

  debug: false,
  
  devtool: 'source-map',

  output: {

    path: path.resolve(__dirname, '../docs'),

    filename: '[name].min.js',
    
    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-[chunkhash].js'

  },

  plugins: [
    new DedupePlugin(),
    new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ]

});
