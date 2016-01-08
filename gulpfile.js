// require
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserify = require('browserify');
var babelify = require('babelify');
var jade = require('gulp-jade');


// const
const SRC = './src';
const CONFIG = './src/config';
const DEST = './pubilc';


// css
gulp.task('sass', () => {
    return gulp.src(`${SRC}/scss/styles.scss`)
        .pipe(sass())
        .pipe(pleeease(require(`${CONFIG}/pleeease.json`)))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));


// js
gulp.task('browserify', () => {
    return browserify(`${SRC}/js/script.js`)
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
});

gulp.task('js', gulp.series('browserify'));


// html
gulp.task('jade', () => {
    var locals = require(`${CONFIG}/meta.json`);

    return gulp.src(`${SRC}/jade/*.jade`)
        .pipe(jade({
            locals: locals,
            pretty: true
        }))
        .pipe(gulp.dest(`${DEST}`));
});

gulp.task('html', gulp.series('jade'));


// default
gulp.task('default', gulp.parallel('css', 'js', 'html'));
