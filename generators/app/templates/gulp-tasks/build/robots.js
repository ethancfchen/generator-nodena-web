const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const src = path.join(assets.build, assets.dest.index);
  const dest = setup.root;

  const options = setup.plugins.gulpRobots;

  return gulp.src(src)
    .pipe($.robots(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}));
};
