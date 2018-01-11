const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through = require('through2');

const path = require('path');
const _ = require('lodash');

const setup = require('setup/setup');

function noop() {
  return through.obj();
}

function resolvePlugins(options) {
  const prefix = 'postcss-';
  return _(options).map((pluginOptions, key) => {
    const moduleName = _.kebabCase(key);
    let modulePath = null;
    if (!pluginOptions) {
      return null;
    }
    try {
      modulePath = require.resolve(`${prefix}${moduleName}`);
    } catch (e) {
      modulePath = require.resolve(moduleName);
    }
    return require(modulePath)(pluginOptions);
  }).filter(_.identity).value();
}

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;

  const src = assets.src.styles;
  const dest = path.join(setup.root, assets.dest.styles);

  const sassOpts = setup.plugins.gulpSass;
  const postcssOpts = resolvePlugins(setup.postcss);
  const preprocessOpts = setup.plugins.gulpPreprocess;

  const sassData = (setup.globals || {}).sass;
  const filterOpts = preprocessOpts.filter.sass;
  const $filter = filterOpts ? $.filter(filterOpts, {restore: true}) : noop();
  const $filterRestore = filterOpts ? $filter.restore : noop();

  preprocessOpts.context = _.merge(preprocessOpts.context, sassData);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.sass(sassOpts).on('error', $.sass.logError))
    .pipe($filter)
    .pipe($.preprocess(preprocessOpts))
    .pipe($filterRestore)
    .pipe($.postcss(postcssOpts))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write('.')))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
