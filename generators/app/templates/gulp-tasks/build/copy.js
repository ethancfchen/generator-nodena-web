const gulp = require('gulp');

const _ = require('lodash');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  let pipe = null;

  _(pref.copy).forEach((target) => {
    const src = target.src;
    const dest = pref.root + (target.dest || '');
    pipe = gulp
      .src(src)
      .pipe(gulp.dest(dest, {cwd: assets.dist}));
  });

  return pipe;
};
