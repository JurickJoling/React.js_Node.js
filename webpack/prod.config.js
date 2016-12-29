require('../server.babel'); // babel registration (runtime transpilation for node)

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '..', 'src'),

  entry: {
    account: [
      './client'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'axios',
      'bootstrap',
      'react-bootstrap',
      'react-date-range',
      'react-bootstrap-datetimepicker',
      'react-bootstrap-sweetalert',
      'react-i18n',
      'react-cookie',
      'redux-thunk',
      'radium',
      'j-toker',
      'moment',
      'classnames',
      'immutable',
      'react-i18n',
      'socket.io-client',
      'react-outside-event',
      'react-select',
      'react-nouislider',
      'es6-promise'
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules',
    ],
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loader: 'babel' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss') },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        include: /\/node_modules\//,
        loader: 'file?name=[1].[hash:6].[ext]&regExp=node_modules/(.*)'
      },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        exclude: /\/node_modules\//,
        loader: 'file?name=[path][name].[hash:6].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/), // include only ru|en locales in moment
    new webpack.IgnorePlugin(/moment\/min\/locales/),
    new ExtractTextPlugin('[name].[contenthash].css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
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
    return [require('postcss-cssnext'), require('postcss-reporter')()];
  }
};
