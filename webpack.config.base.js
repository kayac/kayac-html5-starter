const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const readConfig = require('read-config')
const glob = require('glob')
const path = require('path')

// base config
const SRC = './src'
const DEST = './public'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const constants = readConfig(`${SRC}/constants.yml`)
const { BASE_DIR } = constants

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
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            data: {
                                ...constants,
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

    plugins: [].concat(
        htmlTemplates, // 複数のHTMLファイルを出力する
        new ExtractTextPlugin('[name]'),  // style.cssを出力
    ),
};
