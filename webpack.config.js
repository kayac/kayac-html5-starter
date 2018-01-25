const path = require('path');
const { SRC } = require('./config');

module.exports = {
  entry: {
      script: [ `${SRC}/js/script.js` ],
  },
  output: {
    publicPath: '/js/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '*'],
  },
  devtool: false,
}
