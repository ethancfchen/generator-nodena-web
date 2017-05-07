const gulp = require('gulp');

const mainBowerFiles = require('main-bower-files');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;

  return gulp
    .src(mainBowerFiles(), {base: assets.base.bower})
    .pipe(gulp.dest(assets.vendor, {cwd: assets.base.src}));
};
