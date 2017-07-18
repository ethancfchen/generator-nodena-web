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

  const src = assets.src.docs;
  const dest = pref.root;

  const options = setup.plugins.gulpPug;

  return pump([
    gulp.src(src, {cwd: assets.base.src}),
    $.if(setup.isLocal, $.plumber()),
    $.pug(options),
    gulp.dest(dest, {cwd: assets.dist}),
    browserSync.stream(),
  ]);
};
