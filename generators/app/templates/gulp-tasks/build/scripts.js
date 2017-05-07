const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

const projectSetup = require('setup/setup');

function getGlobals(pref, env) {
  const key = 'js';
  const globals = (pref.globals || {})[key] || {};
  const overrides = ((pref[env] || {}).globals || {})[key];
  return _.merge(globals, overrides);
}

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.scripts;
  const dest = pref.root + assets.dest.scripts;

  const isWebpack = assets.isFileExist(assets.config.webpack);
  const isBabel = assets.isFileExist(assets.config.babel);

  let optionsWebpack = null;
  const optionsUglify = pref.uglify || {};
  const optionsPreprocess = setup.plugins.gulpPreprocess;

  const jsData = getGlobals(pref, env);
  const filterOptions = optionsPreprocess.filter.js;
  const $filter = filterOptions ?
    $.filter(filterOptions, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOptions ? $filter.restore : $.util.noop();

  optionsPreprocess.context = _.merge(optionsPreprocess.context, jsData);

  if (isWebpack) {
    optionsWebpack = require(assets.config.webpack);

    if (_.isFunction(optionsWebpack)) {
      optionsWebpack = optionsWebpack(setup);
    }

    return gulp
      .src(src, {cwd: assets.base.src})
      .pipe($.if(setup.isLocal, $.plumber()))
      .pipe(webpackStream(optionsWebpack, webpack))
      .pipe(gulp.dest(dest, {cwd: assets.dist}))
      .pipe(browserSync.stream());
  }

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.if(isBabel, $.babel()))
    .pipe($.include())
    .pipe($.if(setup.isOnline, $.uglify(optionsUglify)))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write()))
    .pipe($filter)
    .pipe($.preprocess(optionsPreprocess))
    .pipe($filterRestore)
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
