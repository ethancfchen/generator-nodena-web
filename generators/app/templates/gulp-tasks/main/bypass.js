const runSequence = require('run-sequence');

module.exports = function(cb) {
  runSequence(
    'build',
    'browserSync',
    'watch',
    cb
  );
};
