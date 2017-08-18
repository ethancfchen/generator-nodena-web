const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const path = require('path');
const _ = require('lodash');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.opts.browserSync;

  const assets = setup.assets;

  const src = assets.src.images;
  const dest = path.join(setup.root, assets.dest.images);

  const options = setup.imagemin;

  const plugins = _(options.plugins).map((options, key) => {
    return require('imagemin-' + _.kebabCase(key))(options);
  }).reject(_.isUndefined).value();

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.if(setup.isOnline, $.imagemin(plugins, options.main)))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
