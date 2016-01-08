// require
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserify = require('browserify');
var babelify = require('babelify');
var debowerify = require('debowerify');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');


// const
const SRC = './src';
const CONFIG = './src/config';
const DEST = './pubilc';


// css
gulp.task('sass', () => {
    return gulp.src(`${SRC}/scss/style.scss`)
        .pipe(sass())
        .pipe(pleeease(require(`${CONFIG}/pleeease.json`)))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));


// js
gulp.task('browserify', () => {
    return browserify(`${SRC}/js/script.js`)
        .transform(babelify, { presets: ['es2015'] })
        .transform(debowerify)
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


// serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: DEST
        }
    });

    gulp.watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
    gulp.watch([`${SRC}/js/**/*.js`], gulp.series('browserify', browserSync.reload));
    gulp.watch([`${SRC}/jade/**/*.jade`], gulp.series('jade', browserSync.reload));
});

gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('css', 'js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
