const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

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
    return pump([
      gulp.src(src, {cwd: assets.base.src}),
      $.util.noop(),
    ]);
  }
  return pump([
    gulp.src(src, {cwd: assets.base.src}),
    $.if(setup.isLocal, $.plumber()),
    $.if(setup.isVerbose, $.sourcemaps.init()),
    $.modernizr(options),
    $.if(setup.isOnline, $.uglify(uglifyOpts)),
    $.if(setup.isVerbose, $.sourcemaps.write()),
    gulp.dest(dest, {cwd: assets.dist}),
    browserSync.stream(),
  ]);
};
