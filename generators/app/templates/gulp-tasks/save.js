const gulp = require('gulp');

const path = require('path');
const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const src = path.join(setup.root, assets.src.images);
  const dest = assets.dest.images;

  return gulp.src(src, {cwd: assets.build})
    .pipe(gulp.dest(dest, {cwd: assets.base.src}));
};
