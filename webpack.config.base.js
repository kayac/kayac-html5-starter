'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const routeDataMapper = require('webpack-route-data-mapper')
const readConfig = require('read-config')
const path = require('path')

// base config
const SRC = './src'
const DEST = './public'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const constants = readConfig(`${SRC}/constants.yml`)
const { BASE_DIR } = constants


// page/**/*.pug -> dist/**/*.html
const htmlTemplates = routeDataMapper({
    baseDir: `${SRC}/pug/page`,
    src: '**/[!_]*.pug',
    locals: Object.assign(
        {},
        constants,
        {
            meta: readConfig(`${SRC}/pug/meta.yml`)
        }
    )
})

module.exports = {
    // エントリーファイル
    entry: {
        'js/script.js': `${SRC}/js/script.js`,
        'css/style.css': `${SRC}/scss/style.scss`,
    },
    // 出力するディレクトリ・ファイル名などの設定
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR),
        filename: '[name]',
        publicPath: BASE_DIR,
    },
    module: {
        // 各ファイル形式ごとのビルド設定
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
                    {
                        loader: 'pug-loader',
                        options: {
                            root: path.resolve(`${SRC}/pug/`),
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
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [ `${SRC}/scss` ],
                            },
                        }
                    ]
                })
            },
            {
                test: /.ya?ml$/,
                loader: 'js-yaml-loader',
            }
        ]
    },
    // webpack-dev-serverの設定
    devServer: {
        host: HOST,
        port: PORT,
        contentBase: DEST,
        openPage: path.relative('/', BASE_DIR),
    },
    // キャシュ有効化
    cache: true,
    // 拡張子省略時のpath解決
    resolve: {
        extensions: ['.js', '.json', '*'],
        alias: {
            '@': path.join(__dirname, SRC, 'js'),
        }
    },

    plugins: [
        // 複数のHTMLファイルを出力する
        ...htmlTemplates,
        // style.cssを出力
        new ExtractTextPlugin('[name]')
    ],
}
