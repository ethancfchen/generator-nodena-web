const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');

const doiuse = require('doiuse');
const cssnext = require('postcss-cssnext');
const grandientfixer = require('postcss-gradientfixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const mergeLonghand = require('postcss-merge-longhand');
const mergeRules = require('postcss-merge-rules');
const clipPathPolyfill = require('postcss-clip-path-polyfill');

const Setup = require('setup/setup');

function getGlobals(pref, env) {
  const key = 'sass';
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

  const src = assets.src.styles;
  const dest = pref.root + assets.dest.styles;

  const optionsSass = setup.plugins.gulpSass;
  const optionsDoiuse = pref.doiuse;
  let optionsPostcss = [
    cssnext,
    grandientfixer,
    flexbugsFixes,
    mergeLonghand,
    mergeRules,
    clipPathPolyfill,
    setup.isVerbose && optionsDoiuse ? doiuse(optionsDoiuse) : undefined,
  ];
  const optionsPreprocess = setup.plugins.gulpPreprocess;

  const sassData = getGlobals(pref, env);
  const filterOptions = optionsPreprocess.filter.sass;
  const $filter = filterOptions ?
    $.filter(filterOptions, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOptions ? $filter.restore : $.util.noop();

  optionsPostcss = _(optionsPostcss).reject(_.isUndefined).value();
  optionsPreprocess.context = _.merge(optionsPreprocess.context, sassData);

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.if(setup.isVerbose, $.sourcemaps.init()))
    .pipe($.sass(optionsSass).on('error', $.sass.logError))
    .pipe($.postcss(optionsPostcss))
    .pipe($.if(setup.isVerbose, $.sourcemaps.write('.')))
    .pipe($filter)
    .pipe($.preprocess(optionsPreprocess))
    .pipe($filterRestore)
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
