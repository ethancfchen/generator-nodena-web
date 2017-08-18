const config = require('config');

const _ = require('lodash');
const moment = require('moment');

const argv = require('../argv');

/**
 * Plugin Setup: gulp-pug
 *
 * @module setup/plugins/gulp-pug
 *
 * @example {@lang javascript}
 * const PluginGulpPug = require('./plugins/gulp-pug');
 * const pluginGulpPug = new PluginGulpPug(assetsHelper);
 *
 * @see {@link https://github.com/jamen/gulp-pug/|Github}
 * @see {@link https://pugjs.org/api/reference.html#options|Avaliable Options}
 */
class PluginGulpPug {
  constructor(assetsHelper) {
    const env = config.env;

    const version = assetsHelper.getPackageJsonVersion();
    const pugData = (config.globals || {}).pug;

    this.pretty = argv.verbose;
    this.locals = _.merge({
      /* Constants */

      ENV: env,
      VERSION: version,
      DOMAIN: config.domain,

      /* Utilities */
      _,
      moment,
    }, pugData);
  }
}

module.exports = PluginGulpPug;
