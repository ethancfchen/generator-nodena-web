const runSequence = require('run-sequence');

const setup = require('setup/setup');

runSequence.options.ignoreUndefinedTasks = true;

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

    setup.sitemap ? 'build:sitemap' : null,
    setup.robots ? 'build:robots' : null,

    setup.browserSync ? 'browserSync' : null,
    setup.browserSync ? 'watch' : null,

    taskCallback
  );
};
