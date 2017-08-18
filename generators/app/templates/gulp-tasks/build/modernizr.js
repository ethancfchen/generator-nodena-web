const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.opts.browserSync;

  const assets = setup.assets;

  const src = assets.src.scripts;
  const dest = path.join(setup.root, assets.dest.scripts);

  const options = setup.modernizr;
  const uglifyOpts = setup.plugins.gulpUglify;

  const isDisabled = options === false;

  if (isDisabled) {
    return gulp.src(src, {cwd: assets.base.src})
      .pipe($.util.noop());
  }
  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.modernizr(options))
    .pipe($.if(setup.isOnline, $.uglify(uglifyOpts)))
    .on('error', (err) => console.error(err))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
