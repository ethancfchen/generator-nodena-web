const config = require('config');

const _ = require('lodash');

/**
 * Plugin Setup: gulp-sass
 *
 * @module setup/plugins/gulp-sass
 *
 * @example {@lang javascript}
 * const PluginGulpSass = require('./plugins/gulp-sass');
 * const pluginGulpSass = new PluginGulpSass();
 *
 * @see {@link https://github.com/sass/|Github}
 * @see {@link https://github.com/sass/node-sass#options|Avaliable Options}
 */
class PluginGulpSass {
  constructor() {
    _.merge(this, config.sass || {});
  }
}

module.exports = PluginGulpSass;
