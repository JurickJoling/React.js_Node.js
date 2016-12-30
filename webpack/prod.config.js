require('../server.babel'); // babel registration (runtime transpilation for node)

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
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
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        include: /\/node_modules\//,
        loader: 'file?name=[1].[ext]?hash=[hash:6]&regExp=node_modules/(.*)'
      },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        exclude: /\/node_modules\//,
        loader: 'file?name=[path][name].[ext]?hash=[hash:6]'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/), // include only ru|en locales in moment
    new webpack.IgnorePlugin(/moment\/min\/locales/),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
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
  ],

  postcss: function () {
    return [precss, autoprefixer];
  }
};
