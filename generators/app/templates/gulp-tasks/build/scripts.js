const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const path = require('path');
const _ = require('lodash');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;

  const src = assets.src.scripts;
  const dest = path.join(setup.root, assets.dest.scripts);

  const isWebpack = assets.isFileExist(assets.config.webpack);
  const isBabel = assets.isFileExist(assets.config.babel);

  let webpackOpts = null;
  const uglifyOpts = setup.uglify || {};
  const preprocessOpts = setup.plugins.gulpPreprocess;

  const jsData = (setup.globals || {}).js;
  const filterOpts = preprocessOpts.filter.js;
  const $filter = filterOpts ?
    $.filter(filterOpts, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOpts ? $filter.restore : $.util.noop();

  preprocessOpts.context = _.merge(preprocessOpts.context, jsData);

  if (isWebpack) {
    webpackOpts = require(assets.config.webpack);

    if (_.isFunction(webpackOpts)) {
      webpackOpts = webpackOpts(setup);
    }

    return gulp.src(src, {cwd: assets.base.src})
      .pipe($.if(!setup.isOnline, $.plumber()))
      .pipe(webpackStream({config: webpackOpts}, webpack))
      .pipe(gulp.dest(dest, {cwd: assets.build}))
      .pipe(browserSync.stream());
  }

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($filter)
    .pipe($.preprocess(preprocessOpts))
    .pipe($filterRestore)
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.if(isBabel, $.babel()))
    .pipe($.include())
    .pipe($.if(setup.isOnline, $.uglify(uglifyOpts)))
    .on('error', (err) => console.error(err))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
