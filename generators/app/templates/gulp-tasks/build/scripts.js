const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

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

    return pump([
      gulp.src(src, {cwd: assets.base.src}),
      $.if(setup.isLocal, $.plumber()),
      webpackStream(webpackOpts, webpack),
      gulp.dest(dest, {cwd: assets.dist}),
      browserSync.stream(),
    ]);
  }
  return pump([
    gulp.src(src, {cwd: assets.base.src}),
    $.if(setup.isLocal, $.plumber()),
    $filter,
    $.preprocess(preprocessOpts),
    $filterRestore,
    $.if(setup.isVerbose, $.sourcemaps.init()),
    $.if(isBabel, $.babel()),
    $.include(),
    $.if(setup.isOnline, $.uglify(uglifyOpts)),
    $.if(setup.isVerbose, $.sourcemaps.write()),
    gulp.dest(dest, {cwd: assets.dist}),
    browserSync.stream(),
  ]);
};
