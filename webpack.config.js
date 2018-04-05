const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const readConfig = require('read-config')

const path = require('path');

const HTMLTemplates = (() =>{
  const glob = require('glob')

  const templates = []

  const filenames = glob.sync(`./src/pug/page/**/[!_]*.pug`)
  let files = filenames.map(file => {
    return {
      path: file,
      filename: file
        .replace('./src/pug/page', '.')
        .replace(/\.pug$/, '.html'),
      title: false,
    }
  })

  files.forEach(({path, filename}) => {
    templates.push(new HTMLWebpackPlugin({
      template: path,
      filename,
      title: false,
      hash: true,
    }))
  })

  return templates
})();

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
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                data: {
                  ...readConfig('./src/config.yml'),
                  meta: readConfig('./src/pug/meta.yml')
                },
                basedir: path.resolve('./src/pug/'),
                pretty: true,
              }
            }
          ],
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
