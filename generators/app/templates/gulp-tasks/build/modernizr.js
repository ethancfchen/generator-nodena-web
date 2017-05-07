const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.scripts;
  const dest = pref.root + assets.dest.scripts;

  const optionsModernizr = pref.modernizr;
  const optionsUglify = setup.plugins.gulpUglify;

  const isDisabled = optionsModernizr === false;

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
    .pipe($.modernizr(optionsModernizr))
    .pipe($.if(setup.isOnline, $.uglify(optionsUglify)))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
