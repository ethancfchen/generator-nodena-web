const gulp = require('gulp');
const merge = require('merge-stream');

const path = require('path');
const _ = require('lodash');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const streams = [];

  _(setup.copy).forEach((target, index) => {
    const src = target.src;
    const dest = path.join(setup.root, target.dest || '');
    streams.push(
      gulp.src(src)
        .pipe(gulp.dest(dest, {cwd: assets.build}))
    );
  });

  return merge(streams);
};
