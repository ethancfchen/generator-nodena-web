const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.docs;
  const dest = pref.root;

  const optionsPug = setup.plugins.gulpPug;

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.pug(optionsPug))
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
