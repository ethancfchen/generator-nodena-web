const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

const Setup = require('setup/setup');

function getGlobals(pref, env) {
  const key = 'js';
  const globals = (pref.globals || {})[key] || {};
  const overrides = ((pref[env] || {}).globals || {})[key];
  return _.merge(globals, overrides);
}

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = new Setup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.scripts;
  const dest = pref.root + assets.dest.scripts;

  const isWebpack = assets.isFileExist(assets.config.webpack);
  const isBabel = assets.isFileExist(assets.config.babel);

  let webpackOpts = null;
  const uglifyOpts = pref.uglify || {};
  const preprocessOpts = setup.plugins.gulpPreprocess;

  const jsData = getGlobals(pref, env);
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

    return gulp
      .src(src, {cwd: assets.base.src})
      .pipe($.if(setup.isLocal, $.plumber()))
      .pipe(webpackStream(webpackOpts, webpack))
      .pipe(gulp.dest(dest, {cwd: assets.dist}))
      .pipe(browserSync.stream());
  }

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.if(isBabel, $.babel()))
    .pipe($.include())
    .pipe($.if(setup.isOnline, $.uglify(uglifyOpts)))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe($filter)
    .pipe($.preprocess(preprocessOpts))
    .pipe($filterRestore)
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
