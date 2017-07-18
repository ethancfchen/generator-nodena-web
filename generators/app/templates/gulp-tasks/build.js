const runSequence = require('run-sequence');

module.exports = function(taskCallback) {
  runSequence(
    'build:clean',
    [
      'build:copy',
      'build:docs',
      'build:styles',
      'build:scripts',
      'build:modernizr',
      'build:images',
      'build:extras',
    ],
    taskCallback
  );
};
