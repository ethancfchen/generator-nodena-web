const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const path = require('path');
const _ = require('lodash');

const doiuse = require('doiuse');
const cssnext = require('postcss-cssnext');
const grandientfixer = require('postcss-gradientfixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const mergeLonghand = require('postcss-merge-longhand');
const mergeRules = require('postcss-merge-rules');
const clipPathPolyfill = require('postcss-clip-path-polyfill');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.opts.browserSync;

  const assets = setup.assets;

  const src = assets.src.styles;
  const dest = path.join(setup.root, assets.dest.styles);

  const sassOpts = setup.plugins.gulpSass;
  const doiuseOpts = setup.doiuse;
  let postcssOpts = [
    cssnext,
    grandientfixer,
    flexbugsFixes,
    mergeLonghand,
    mergeRules,
    clipPathPolyfill,
    setup.isVerbose && doiuseOpts ? doiuse(doiuseOpts) : undefined,
  ];
  const preprocessOpts = setup.plugins.gulpPreprocess;

  const sassData = (setup.globals || {}).sass;
  const filterOptions = preprocessOpts.filter.sass;
  const $filter = filterOptions ?
    $.filter(filterOptions, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOptions ? $filter.restore : $.util.noop();

  postcssOpts = _(postcssOpts).reject(_.isUndefined).value();
  preprocessOpts.context = _.merge(preprocessOpts.context, sassData);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.sass(sassOpts).on('error', $.sass.logError))
    .pipe($.postcss(postcssOpts))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write('.')))
    .pipe($filter)
    .pipe($.preprocess(preprocessOpts))
    .pipe($filterRestore)
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
