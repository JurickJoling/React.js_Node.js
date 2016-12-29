require('../server.babel'); // babel registration (runtime transpilation for node)

const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '..', 'src'),

  entry: {
    app: [
      './index'
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'public', 'build'),
    publicPath: '/build/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loader: 'babel' }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/), // include only ru|en locales in moment
    new webpack.IgnorePlugin(/moment\/min\/locales/),
    new webpack.DefinePlugin({
      'process.env': {
        __CLIENT__: JSON.stringify(true),
        __DEVTOOLS__: JSON.stringify(false),
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
        unsafe: false
        // screw_ie8: true
      }
    })
  ]
};
