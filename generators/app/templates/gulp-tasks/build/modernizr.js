const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = new Setup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.scripts;
  const dest = pref.root + assets.dest.scripts;

  const options = pref.modernizr;
  const uglifyOpts = setup.plugins.gulpUglify;

  const isDisabled = options === false;

  if (isDisabled) {
    return gulp
      .src(src, {cwd: assets.base.src})
      .pipe($.util.noop());
  }

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.include())
    .pipe($.modernizr(options))
    .pipe($.if(setup.isOnline, $.uglify(uglifyOpts)))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
