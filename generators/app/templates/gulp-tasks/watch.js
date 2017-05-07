const gulp = require('gulp');

const bsHtmlInjector = require('bs-html-injector');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
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
  gulp.watch(assets.dist + assets.dest.docs, bsHtmlInjector);
};
