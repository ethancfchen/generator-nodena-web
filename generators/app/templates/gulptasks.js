const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

module.exports = () => {
  $.taskLoader({
    browserSync,
  });
};
