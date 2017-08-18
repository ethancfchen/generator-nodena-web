const gulp = require('gulp');

const path = require('path');
const _ = require('lodash');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  let pipe = null;

  _(setup.copy).forEach((target) => {
    const src = target.src;
    const dest = path.join(setup.root, target.dest || '');
    pipe = gulp
      .src(src)
      .pipe(gulp.dest(dest, {cwd: assets.build}));
  });

  return pipe;
};
