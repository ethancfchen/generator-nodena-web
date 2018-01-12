const gulp = require('gulp');
const path = require('path');
const config = require('config');

const tasks = [
  'build:clean',
  'build:images',
];

module.exports = gulp.series(tasks, (taskDone) => {
  const assets = config.assets;

  const srcs = assets.src.images.map((imagePath) => {
    return path.join(config.root, imagePath);
  });
  const dest = assets.dest.images;

  return gulp.src(srcs, {cwd: assets.build})
    .pipe(gulp.dest(dest, {cwd: assets.base.src}));
});
