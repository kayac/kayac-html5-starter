'use strict';

// import
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import browserify from 'browserify';
import babelify from 'babelify';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';

import getFolders from './gulp/util/getFolders.js';

// const
const SRC = './src';
const CONFIG = './src/config';
const HTDOCS = './public';
const BASE_PATH = '/';
const DEST = `${HTDOCS}${BASE_PATH}`;


// css
gulp.task('sass', () => {
    const config = readConfig(`${CONFIG}/pleeease.json`);
    return gulp.src(`${SRC}/scss/style.scss`)
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

    return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
        .pipe(pug({
            locals: locals,
            pretty: true
        }))
        .pipe(gulp.dest(`${DEST}`));
});

gulp.task('html', gulp.series('pug'));


// sprite
gulp.task('spritesmith', () => {
    const folders = getFolders(`${SRC}/sprite/`);
    folders.forEach((folder) => {
        const spriteData = gulp.src(`${SRC}/sprite/${folder}/*.png`)
            .pipe(plumber())
            .pipe(spritesmith({
                imgName: `sprite-${folder}.png`,
                imgPath: `../images/sprite-${folder}.png`,
                cssName: `_sprite-${folder}.scss`,
                cssFormat: 'scss',
                cssVarMap: function(sprite) {
                  sprite.name = `sprite-${folder}-${sprite.name}`;
                },
                cssSpritesheetName: `spritesheet-${folder}`,
                cssOpts: {
                  functions: false
                },
                algorithm: 'binary-tree',
                padding: 4
            }));
        spriteData.img.pipe(gulp.dest(`${DEST}/images/`));
        spriteData.css.pipe(gulp.dest(`${SRC}/scss/module/`));
    });
});
gulp.task('sprite', gulp.series('spritesmith'));


// serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: HTDOCS
        },
        startPath: BASE_PATH,
        ghostMode: false
    });

    watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
    watch([`${SRC}/js/**/*.js`], gulp.series('browserify', browserSync.reload));
    watch([
        `${SRC}/pug/**/*.pug`,
        `${SRC}/config/meta.yml`
    ], gulp.series('pug', browserSync.reload));
});

gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('css', 'js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
