const path = require('path');
const _ = require('lodash');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('config');

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
  const localServer = this.context.localServer;

  const assets = config.assets;
  const isOnline = config.isOnline;

  const src = assets.src.images;
  const dest = path.join(config.root, assets.dest.images);

  const imageminOpts = config.imagemin;

  const plugins = resolvePlugins(imageminOpts.plugins);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!isOnline, $.plumber()))
    .pipe($.if(isOnline, $.imagemin(plugins, imageminOpts.main)))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(localServer.stream());
};
