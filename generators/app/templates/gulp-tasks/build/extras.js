const fs = require('fs');
const _ = require('lodash');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through = require('through2');
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
  return ((config.preprocess || {}).filter || {}).extras;
}

function getPreprocessOptions() {
  const globals = (config.globals || {}).extras;
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
  if (!globals) {
    return false;
  }
  return options;
}

function getOptions() {
  return {
    filter: getFilterOptions(),
    preprocess: getPreprocessOptions(),
  };
}

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = config.assets;

  const src = assets.src.extras;
  const dest = config.root;

  const options = getOptions();
  const isPreprocess = !_.isEmpty(options.preprocess);

  const $filter = options.filter ?
    $.filter(options.filter, {restore: true}) : noop();
  const $filterRestore = options.filter ?
    $filter.restore : noop();

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(isPreprocess, $filter))
    .pipe($.if(isPreprocess, $.preprocess(options.preprocess)))
    .pipe($.if(isPreprocess, $filterRestore))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
