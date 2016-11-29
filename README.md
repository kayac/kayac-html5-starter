kayac-html5-starter
====

## 事前に用意するもの
- node.js (version 5.0.0以上)

## 環境構築
```
# 開発に使うnpmパッケージをインストール
yarn

# または
npm install
```

## ファイル構成

- `README.md`
  - このファイルです。
- `package.json`
  - 依存するnpmパッケージに関する設定ファイルです。
- `gulpfile.babel.js`
  - gulpタスクに関する設定ファイルです。（`.babel.js`となっているのは、es2015で書くための印です）
- `public`
  - Web公開されるファイルの置き場所です。 (gulpタスク実行までは空の状態です)
- `src/scss`, `src/js`, `src/pug`, `src/config`
  - ビルドに必要な各種ソースコードです。

## 開発手順

開発時に必要なタスクは、npm scriptおよびgulp.jsで管理されています。
shellから以下のコマンドを実行することで、各種ビルド・タスク実行が可能です。

- `npm start`
  - すべてのソースコードをビルドし、開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ビルド・自動ブラウザ更新します
  - 基本的には、このコマンドを実行しておくだけで開発が可能なはずです。

## 使用言語

- HTMLテンプレート: [pug](http://jade-lang.com/)
- CSSメタ言語: [Sass(scss)](http://sass-lang.com/)
- Javascript: [ES2015(ECMAScript 6)](https://babeljs.io/docs/learn-es2015/)

## 対応ブラウザ
- 各種モダンブラウザ最新バージョン・IE10以上
  - 対応ブラウザを変更する場合、`src/config/pleeease.json`の`autoprefixer.browsers`を修正することをお忘れなく
  - またIE8に対応する場合は、jQueryを1系にすることもお忘れなく

## 依存ライブラリ

`npm install`でインストールされるライブラリ（一部）です。
全てを理解していなくても、開発は問題なく行えますが、挙動に問題がある場合・カスタマイズしたい場合などに参照してみてください。

- [gulp.js](http://gulpjs.com/)
- [Babel](https://babeljs.io/)
- [browserify](http://browserify.org/)
- [pleeease](http://pleeease.io/)
- [browser-sync](https://www.browsersync.io/)
- [jQuery](https://jquery.com/)
- [Reset CSS](http://meyerweb.com/eric/tools/css/reset/)
