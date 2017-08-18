const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const src = '**/*.html';
  const dest = setup.root;

  const options = {
    siteUrl: setup.domain,
  };

  return gulp.src(src, {cwd: assets.build})
    .pipe($.sitemap(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}));
};
