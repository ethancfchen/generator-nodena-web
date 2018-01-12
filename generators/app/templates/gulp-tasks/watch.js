const gulp = require('gulp');
const path = require('path');
const bsHtmlInjector = require('bs-html-injector');
const config = require('config');

module.exports = function(taskDone) {
  const assets = config.assets;

  const watches = assets.watch;

  gulp.watch(watches.docs, gulp.parallel('build:docs'));
  gulp.watch(watches.styles, gulp.parallel('build:styles'));
  gulp.watch(
    [watches.scripts],
    gulp.parallel('build:scripts')
  );
  gulp.watch(watches.images, gulp.parallel('build:images'));
  gulp.watch(watches.extras, gulp.parallel('build:extras'));
  gulp.watch(path.join(assets.build, assets.dest.docs), bsHtmlInjector);
  taskDone();
};
