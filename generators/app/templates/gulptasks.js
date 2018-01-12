const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const GulpRegistry = require('undertaker-forward-reference');

const localServer = require('browser-sync').create();

module.exports = function() {
  gulp.registry(new GulpRegistry());
  $.loadAllTasks({
    localServer,
  });

  gulp.task('default', gulp.series('build'));
};
