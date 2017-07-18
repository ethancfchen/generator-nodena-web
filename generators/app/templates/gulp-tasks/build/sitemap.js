const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = '**/*.html';
  const dest = pref.root;

  const options = {
    siteUrl: setup.domain,
  };

  return gulp.src(src, {cwd: assets.dist})
    .pipe($.sitemap(options))
    .pipe(gulp.dest(dest, {cwd: assets.dist}));
};
