const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const readConfig = require('read-config')
const glob = require('glob')

const path = require('path')

const SRC = './src'
const DEST = './public'

// page/**/*.pug -> dist/**/*.html
const HTMLTemplates = (() =>{
  const pageDir = `${SRC}/pug/page`

  const filepaths = glob.sync(`${pageDir}/**/[!_]*.pug`)

  return filepaths.map(filepath => {
    const template = filepath
    const filename = filepath
      .replace(pageDir, '.')
      .replace(/\.pug$/, '.html')
    return new HTMLWebpackPlugin({
      template,
      filename,
      title: false,
      hash: true,
    })
  })
})()

module.exports = [
  // js
  {
    entry: {
      'js/script.js': `${SRC}/js/script.js`,
      'css/style.css': `${SRC}/scss/style.scss`,
    },

    output: {
      path: path.resolve(__dirname, DEST),
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
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                data: {
                  ...readConfig(`${SRC}/config.yml`),
                  meta: readConfig(`${SRC}/pug/meta.yml`)
                },
                basedir: path.resolve(`${SRC}/pug/`),
                pretty: true,
              }
            }
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /.ya?ml$/,
          loader: 'js-yaml-loader',
        }
      ]
    },

    devServer: {
      port: 3000,
      contentBase: DEST,
    },

    cache: true,

    resolve: {
      extensions: ['.js', '.json', '*'],
    },

    plugins: [
      ...HTMLTemplates,
      new ExtractTextPlugin('[name]')
    ],
  },
]
