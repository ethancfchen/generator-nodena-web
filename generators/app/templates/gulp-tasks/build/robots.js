const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.dist + assets.dest.index;
  const dest = pref.root;

  const options = setup.plugins.gulpRobots;

  return gulp
    .src(src)
    .pipe($.robots(options))
    .pipe(gulp.dest(dest, {cwd: assets.dist}));
};
