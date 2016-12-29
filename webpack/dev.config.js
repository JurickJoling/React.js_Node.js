const webpack = require('webpack');
const path = require('path');

const config = require('./config');

console.log(config);

const host = process.env.HOST || config.host || 'localhost';
const port = process.env.PORT || config.port + 1;

module.exports = {
  devtool: 'source-map',

  context: path.join(__dirname, '..', 'src'),

  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'webpack/hot/only-dev-server',
      './index'
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: 'http://' + host + ':' + port + '/build/',
    filename: '[name].js?hash=[hash]',
    chunkFilename: '[name].js?hash=[chunkhash]'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loaders: ['react-hot', 'babel'] }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/), // include only en locales in moment
    new webpack.IgnorePlugin(/moment\/min\/locales/),
    new webpack.DefinePlugin({
      'process.env': {
        __CLIENT__: JSON.stringify(true),
        __DEVTOOLS__: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]
};
