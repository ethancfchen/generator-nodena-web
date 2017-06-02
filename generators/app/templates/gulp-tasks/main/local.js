const runSequence = require('run-sequence');

module.exports = (cb) => {
  runSequence(
    'build',
    'browserSync',
    'watch',
    cb
  );
};
