const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path')

module.exports = [
  // js
  {
    mode: 'development',

    entry: {
      'js/script.js': `./src/js/script.js`,
      'css/style.css': `./src/scss/style.scss`,
    },

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name]',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
          options: {
            compact: true,
            cacheDirectory: true,
          }
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        },
      ]
    },

    devServer: {
    },

    resolve: {
      extensions: ['.js', '.json', '*'],
    },

    plugins: [
      new HTMLWebpackPlugin({
        filename: `index.html`,
        template: `./src/pug/page/index.pug`,
      }),
    ],
  },
]
