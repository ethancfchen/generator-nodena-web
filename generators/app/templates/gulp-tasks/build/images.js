const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const path = require('path');
const _ = require('lodash');

const setup = require('setup/setup');

function resolvePlugins(options) {
  const prefix = 'imagemin-';
  return _(options).map((pluginOptions, key) => {
    const moduleName = _.kebabCase(key);
    let modulePath = null;
    if (!pluginOptions) {
      return null;
    }
    try {
      modulePath = require.resolve(`${prefix}${moduleName}`);
    } catch (e) {
      modulePath = require.resolve(moduleName);
    }
    return require(modulePath)(options);
  }).filter(_.identity).value();
}

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;

  const src = assets.src.images;
  const dest = path.join(setup.root, assets.dest.images);

  const imageminOpts = setup.imagemin;

  const plugins = resolvePlugins(imageminOpts.plugins);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!setup.isOnline, $.plumber()))
    .pipe($.if(setup.isOnline, $.imagemin(plugins, imageminOpts.main)))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
