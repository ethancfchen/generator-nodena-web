const path = require('path');
const gulp = require('gulp');
const merge = require('merge-stream');
const config = require('config');

module.exports = function(taskDone) {
  const assets = config.assets;
  const streams = [];

  Array.prototype.forEach.call(config.copy || [], (target) => {
    const src = target.src;
    const dest = path.join(config.root, target.dest || '');
    streams.push(
      gulp.src(src)
        .pipe(gulp.dest(dest, {cwd: assets.build}))
    );
  });

  if (streams.length > 0) {
    return merge(streams);
  }
  taskDone();
};
