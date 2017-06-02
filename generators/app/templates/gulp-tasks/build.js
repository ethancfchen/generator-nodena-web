const runSequence = require('run-sequence');

module.exports = (cb) => {
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
    cb
  );
};
