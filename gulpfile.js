// require
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');


// const
const SRC = './src';
const DEST = './pubilc';


// js
gulp.task('browserify', () => {
    return browserify(`${SRC}/js/script.js`)
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
});

gulp.task('js', gulp.series('browserify'));


// default
gulp.task('default', gulp.series('js'));
