const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');
const _ = require('lodash');

const config = require('config');

function getOptions() {
  const domain = config.domain;
  const options = {};
  _.merge(options, {
    useragent: '*',
    sitemap: `${domain}/sitemap.xml`,
  }, config.robots);
  return options;
}

module.exports = function() {
  const assets = config.assets || {};
  const src = path.join(assets.build, assets.dest.index);
  const dest = config.root;
  const options = getOptions();

  return gulp.src(src)
    .pipe($.robots(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}));
};
