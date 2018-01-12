const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through = require('through2');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const config = require('config');

const ASSETS = {
  manifest: 'package.json',
};

function getVersion() {
  const assets = config.assets;
  const file = assets.manifest || ASSETS.manifest;
  const content = fs.readFileSync(file, 'utf8');
  const manifest = JSON.parse(content);
  return manifest.version;
}

function noop() {
  return through.obj();
}

function getFilterOptions() {
  return ((config.preprocess || {}).filter || {}).js;
}

function getPreprocessOptions() {
  const globals = (config.globals || {}).js;
  const options = {};
  const defaults = {
    context: {
      ENV: config.env,
      VERSION: getVersion(),
      DOMAIN: config.domain,
    },
  };

  _.merge(defaults.context, globals);
  _.merge(options, defaults);
  return options;
}

function getWebpackOptions() {
  const assets = config.assets;
  const isWebpack = fs.existsSync(assets.config.webpack);
  let options = null;
  if (isWebpack) {
    options = require(assets.config.webpack);
    if (_.isFunction(options)) {
      options = options(config);
    }
  }
  return options;
}

function getOptions() {
  return {
    filter: getFilterOptions(),
    preprocess: getPreprocessOptions(),
    uglify: config.uglify || {},
    webpack: getWebpackOptions(),
  };
}

module.exports = function() {
  const localServer = this.context.localServer;

  const assets = config.assets;
  const isOnline = config.isOnline;
  const isVerbose = config.isVerbose;

  const src = assets.src.scripts;
  const dest = path.join(config.root, assets.dest.scripts);

  const isBabel = fs.existsSync(assets.config.babel);

  const options = getOptions();

  const $filter = options.filter ?
    $.filter(options.filter, {restore: true}) : noop();
  const $filterRestore = options.filter ?
    $filter.restore : noop();

  if (options.webpack) {
    return gulp.src(src, {cwd: assets.base.src})
      .pipe($.if(!isOnline, $.plumber()))
      .pipe(webpackStream({config: options.webpack}, webpack))
      .pipe(gulp.dest(dest, {cwd: assets.build}))
      .pipe(localServer.stream());
  }

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!isOnline, $.plumber()))
    .pipe($filter)
    .pipe($.preprocess(options.preprocess))
    .pipe($filterRestore)
    .pipe($.if(isVerbose, $.sourcemaps.init()))
    .pipe($.if(isBabel, $.babel()))
    .pipe($.include())
    .pipe($.if(isOnline, $.uglify(options.uglify)))
    .on('error', (err) => console.error(err))
    .pipe($.if(isVerbose, $.sourcemaps.write()))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(localServer.stream());
};
