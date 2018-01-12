const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('config');

module.exports = function() {
  const assets = config.assets;

  const src = '**/*.html';
  const dest = config.root;

  const options = {
    siteUrl: config.domain,
  };

  return gulp.src(src, {cwd: assets.build})
    .pipe($.sitemap(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}));
};
