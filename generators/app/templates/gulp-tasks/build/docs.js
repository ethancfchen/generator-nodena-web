const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;
  const src = assets.src.docs;
  const dest = setup.root;

  const options = setup.plugins.gulpPug;

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.pug(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
