const gulp = require('gulp');

const path = require('path');
const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const srcs = assets.src.images.map((imagePath) => {
    return path.join(setup.root, imagePath);
  });
  const dest = assets.dest.images;

  return gulp.src(srcs, {cwd: assets.build})
    .pipe(gulp.dest(dest, {cwd: assets.base.src}));
};
