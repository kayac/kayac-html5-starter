'use strict';

// import
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const pleeease = require('gulp-pleeease');
const browserify = require('browserify');
const babelify = require('babelify');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const readConfig = require('read-config');
const watch = require('gulp-watch');
const RevLogger = require('rev-logger');


// const
const SRC = './src';
const CONFIG = './src/config';
const HTDOCS = './public';
const BASE_PATH = '';
const DEST = `${HTDOCS}${BASE_PATH}`;

const revLogger = new RevLogger({
    'style.css': `${DEST}/css/style.css`,
    'script.js': `${DEST}/js/script.js`
});


// css
gulp.task('sass', () => {
    const config = readConfig(`${CONFIG}/pleeease.json`);
    return gulp.src(`${SRC}/scss/style.scss`)
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(pleeease(config))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));

// js
gulp.task('browserify', () => {
    return browserify(`${SRC}/js/script.js`)
        .transform(babelify)
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
});

gulp.task('js', gulp.parallel('browserify'));

// html
gulp.task('pug', () => {
    const locals = readConfig(`${CONFIG}/meta.yml`);
    locals.versions = revLogger.versions();
    locals.basePath = BASE_PATH;
    
    return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
        .pipe(pug({
            locals: locals,
            pretty: true,
            basedir: `${SRC}/pug`
        }))
        .pipe(gulp.dest(`${DEST}`));
});

gulp.task('html', gulp.series('pug'));


// serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: HTDOCS
        },
        startPath: `${BASE_PATH}/`,
        ghostMode: false
    });

    watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
    watch([`${SRC}/js/**/*.js`], gulp.series('browserify', browserSync.reload));
    watch([
        `${SRC}/pug/**/*.pug`,
        `${SRC}/config/meta.yml`
    ], gulp.series('pug', browserSync.reload));

    revLogger.watch((changed) => {
        gulp.series('pug', browserSync.reload)();
    });
});

gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('css', 'js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
