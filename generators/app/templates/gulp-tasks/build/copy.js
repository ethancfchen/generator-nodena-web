const gulp = require('gulp');
const merge = require('merge-stream');

const path = require('path');

const setup = require('setup/setup');

module.exports = function(taskDone) {
  const assets = setup.assets;

  const streams = [];

  (setup.copy || []).forEach((target) => {
    const src = target.src;
    const dest = path.join(setup.root, target.dest || '');
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
