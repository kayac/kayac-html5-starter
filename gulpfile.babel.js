'use strict';

// import
import path from 'path';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import browserify from 'browserify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import jade from 'gulp-jade';
import browserSync from 'browser-sync';
import through from 'through2';


// const
const SRC = './src';
const CONFIG = './src/config';
const DEST = './public';


// css
gulp.task('sass', () => {
    return gulp.src(`${SRC}/scss/style.scss`)
        .pipe(sass())
        .pipe(pleeease(require(`${CONFIG}/pleeease.json`)))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));


// js
gulp.task('copy-bower', () => {
    return gulp.src(require(`${CONFIG}/copy-bower.json`).src, {
        cwd: 'bower_components'
    }).pipe(gulp.dest(`${DEST}/js/lib`));
});

gulp.task('browserify', () => {
    return gulp.src(`${SRC}/js/kayacHtml5Starter*`)
        .pipe(through.obj((file, encoding, cb) => {
            const bundleStream = browserify(file.path)
                      .transform(babelify)
                      .transform(debowerify)
                      .bundle();
            
            bundleStream.on('end', cb);

            return bundleStream
                .pipe(source(path.basename(file.path)))
                .pipe(gulp.dest(`${DEST}/js`));
        }));
});

gulp.task('js', gulp.parallel('browserify', 'copy-bower'));


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
