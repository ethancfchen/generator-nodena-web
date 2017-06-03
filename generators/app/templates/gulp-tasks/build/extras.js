const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');

const Setup = require('setup/setup');

function getGlobals(pref, env) {
  const key = 'extras';
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

  const preprocessOpts = setup.plugins.gulpPreprocess;

  const extrasData = getGlobals(pref, env);
  const isPreprocess = !_.isEmpty(extrasData);
  const filterOpts = preprocessOpts.filter.extras;
  const $filter = filterOpts ?
    $.filter(filterOpts, {restore: true}) :
    $.util.noop();
  const $filterRestore = filterOpts ? $filter.restore : $.util.noop();

  const src = assets.src.extras;
  const dest = pref.root;

  preprocessOpts.context = _.merge(preprocessOpts.context, extrasData);

  return gulp
    .src(src, {cwd: assets.base.src})
    .pipe($.if(isPreprocess, $filter))
    .pipe($.if(isPreprocess, $.preprocess(preprocessOpts)))
    .pipe($.if(isPreprocess, $filterRestore))
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
