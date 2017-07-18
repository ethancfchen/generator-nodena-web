const runSequence = require('run-sequence');

module.exports = function(taskCallback) {
  runSequence(
    'build',
    'browserSync',
    'watch',
    taskCallback
  );
};
