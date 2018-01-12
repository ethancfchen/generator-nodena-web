const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');
const config = require('config');

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
  config.sitemap ? 'build:sitemap' : null,
  config.robots ? 'build:robots' : null,

  config.localServer ? 'watch' : null,
  config.localServer ? 'localServer' : null,
].filter((task) => Boolean(task));

module.exports = gulp.series(tasks, (taskDone) => {
  log(chalk.green('Build Completed.'));
  taskDone();
});
