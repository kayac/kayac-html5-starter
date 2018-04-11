const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const readConfig = require('read-config')
const glob = require('glob')
const path = require('path')
const portfinder = require('portfinder')

// base config
const SRC = './src'
const DEST = './public'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

// 空いているポート番号のベースとなるポート番号の設定
portfinder.basePort = PORT

// page/**/*.pug -> dist/**/*.html
const htmlTemplates = (() =>{
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

const webpackConfig = {
    // エントリーファイル
    entry: {
        'js/script.js': `${SRC}/js/script.js`,
        'css/style.css': `${SRC}/scss/style.scss`,
    },
    // 出力するディレクトリ・ファイル名などの設定
    output: {
        path: path.resolve(__dirname, DEST),
        filename: '[name]',
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
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            data: {
                                ...readConfig(`${SRC}/constants.yml`),
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
    // webpack-dev-serverの設定
    devServer: {
        host: HOST,
        port: PORT,
        contentBase: DEST,
    },
    // キャシュ有効化
    cache: true,
    // 拡張子省略時のpath解決
    resolve: {
        extensions: ['.js', '.json', '*'],
    },

    plugins: [
        // 複数のHTMLファイルを出力する
        ...htmlTemplates,
        // style.cssを出力
        new ExtractTextPlugin('[name]')
    ],
}

// ポート番号を割り当ててから実行させる
module.exports = portfinder.getPortPromise()
    .then(port => {
        webpackConfig.devServer.port = port
        return webpackConfig
    })
    .catch(err => err)
