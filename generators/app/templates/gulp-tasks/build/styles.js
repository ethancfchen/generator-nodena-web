const fs = require('fs');
const path = require('path');
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

function getSassOptions() {
  return config.sass;
}

function getFilterOptions() {
  return ((config.preprocess || {}).filter || {}).sass;
}

function getPreprocessOptions() {
  const globals = (config.globals || {}).sass;
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

function getPostcssOptions() {
  const options = config.postcss;
  const prefix = 'postcss-';
  return _(options).map((pluginOptions, key) => {
    const pluginName = _.kebabCase(key);
    let pluginPath = null;
    let plugin = null;
    if (!pluginOptions) {
      return null;
    }
    try {
      pluginPath = require.resolve(`${prefix}${pluginName}`);
    } catch (e) {
      pluginPath = require.resolve(pluginName);
    }
    plugin = require(pluginPath);
    if (typeof plugin === 'function') {
      return plugin(pluginOptions);
    }
    return plugin;
  }).filter(_.identity).value();
}

function getOptions() {
  return {
    sass: getSassOptions(),
    filter: getFilterOptions(),
    preprocess: getPreprocessOptions(),
    postcss: getPostcssOptions(),
  };
}

module.exports = function() {
  const localServer = this.context.localServer;

  const assets = config.assets;
  const isOnline = config.isOnline;
  const isVerbose = config.isVerbose;

  const src = assets.src.styles;
  const dest = path.join(config.root, assets.dest.styles);

  const options = getOptions();

  const $filter = options.filter ?
    $.filter(options.filter, {restore: true}) : noop();
  const $filterRestore = options.filter ?
    $filter.restore : noop();

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!isOnline, $.plumber()))
    .pipe($.if(isVerbose, $.sourcemaps.init()))
    .pipe($.sass(options.sass).on('error', $.sass.logError))
    .pipe($filter)
    .pipe($.preprocess(options.preprocess))
    .pipe($filterRestore)
    .pipe($.postcss(options.postcss))
    .pipe($.if(isVerbose, $.sourcemaps.write('.')))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(localServer.stream());
};
