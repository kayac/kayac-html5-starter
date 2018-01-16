'use strict';

// import
import gulp from 'gulp';
import gutil from 'gutil';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import pug from 'gulp-pug';
import massProduction from 'gulp-mass-production';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import watch from 'gulp-watch';
import RevLogger from 'rev-logger';


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
gulp.task('watchify', () => {
    return watchify(browserify(`${SRC}/js/script.js`))
        .transform(babelify)
        .bundle()
        .on("error", function(err) {
            gutil.log(err.message);
            gutil.log(err.codeFrame);
            this.emit('end');
        })
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
});

gulp.task('js', gulp.parallel('watchify'));

// html
gulp.task('pug', () => {
    const locals = {
        meta: readConfig(`${CONFIG}/meta.yml`),
        versions: revLogger.versions(),
        basePath: BASE_PATH
    };

    return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
        .pipe(massProduction({
            locals: locals,
            markdown: 'posts/*.md',
            template: `${SRC}/pug/post.pug`,
            hrefRule: function (slug, meta) {
                return `${meta.category || 'no-category'}/${slug}`;
            },
            archive: {
                top: {
                    template: `${SRC}/pug/index.pug`,
                    hrefRule: function () {
                        return '';
                    }
                },
                category: {
                    template: `${SRC}/pug/category.pug`,
                    slugRule: function (meta) {
                        return meta.category;
                    },
                    hrefRule: function (slug, meta) {
                        return `category/${slug}`;
                    }
                }
            }
        }))
        .pipe(pug({
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
    watch([`${SRC}/js/**/*.js`], gulp.series('watchify', browserSync.reload));
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
