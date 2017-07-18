const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

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

  const sassOpts = setup.plugins.gulpSass;
  const doiuseOpts = pref.doiuse;
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

  const sassData = getGlobals(pref, env);
  const filterOptions = preprocessOpts.filter.sass;
  const $filter = filterOptions ?
    $.filter(filterOptions, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOptions ? $filter.restore : $.util.noop();

  postcssOpts = _(postcssOpts).reject(_.isUndefined).value();
  preprocessOpts.context = _.merge(preprocessOpts.context, sassData);

  return pump([
    gulp.src(src, {cwd: assets.base.src}),
    $.if(setup.isLocal, $.plumber()),
    $.if(setup.isVerbose, $.sourcemaps.init()),
    $.sass(sassOpts).on('error', $.sass.logError),
    $.postcss(postcssOpts),
    $.if(setup.isVerbose, $.sourcemaps.write('.')),
    $filter,
    $.preprocess(preprocessOpts),
    $filterRestore,
    gulp.dest(dest, {cwd: assets.dist}),
    browserSync.stream(),
  ]);
};
