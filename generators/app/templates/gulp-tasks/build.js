const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const chalk = require('chalk');

const setup = require('setup/setup');

runSequence.options.ignoreUndefinedTasks = true;

module.exports = function() {
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

    () => gutil.log(chalk.green('Build Completed.'))
  );
};
