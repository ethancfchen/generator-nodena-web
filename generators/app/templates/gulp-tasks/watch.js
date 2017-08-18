const gulp = require('gulp');

const path = require('path');
const bsHtmlInjector = require('bs-html-injector');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const watches = assets.watch;

  gulp.watch(watches.docs, ['build:docs']);
  gulp.watch(watches.styles, ['build:styles']);
  gulp.watch(
    [watches.scripts, watches.webpack],
    ['build:scripts', 'build:modernizr']
  );
  gulp.watch(watches.images, ['build:images']);
  gulp.watch(watches.extras, ['build:extras']);
  gulp.watch(path.join(assets.build, assets.dest.docs), bsHtmlInjector);
};
