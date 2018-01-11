const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');

const setup = require('setup/setup');

const tasks = [
  'build:clean',
  gulp.parallel([
    'build:copy',
    'build:docs',
    'build:styles',
    'build:scripts',
    'build:images',
    'build:extras',
  ]),
  setup.sitemap ? 'build:sitemap' : null,
  setup.robots ? 'build:robots' : null,

  setup.localServer ? 'watch' : null,
  setup.localServer ? 'browserSync' : null,
].filter((task) => Boolean(task));

module.exports = gulp.series(tasks, (taskDone) => {
  log(chalk.green('Build Completed.'));
  taskDone();
});
