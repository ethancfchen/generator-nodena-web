/**
 * Plugin Setup: gulp-pug
 *
 * @module setup/plugins/gulp-pug
 */

const _ = require('lodash');
const moment = require('moment');

/**
 * Plugin Setup: gulp-pug
 *
 * @example {@lang javascript}
 * var gulpPug = require('./plugins/gulp-pug')(config, assets);
 *
 * @see {@link https://github.com/jamen/gulp-pug/|Github}
 * @see {@link http://jade-lang.com/api/|Avaliable Options}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */

class PluginGulpPug {
  constructor(config, assets) {
    const env = config.env;
    const argv = config.argv || {};
    const pref = assets.getPreference();

    const version = assets.getPackageJsonVersion();
    const globals = pref.globals || {};
    const overrides = (pref[env] || {}).globals;

    const pugData = globals.pug || {};
    const overridePugData = (overrides || {}).pug;

    this.pretty = argv.verbose;
    this.locals = _.merge({
      /* Constants */
      ENV: env,
      VERSION: version,
      DOMAIN: assets.domain,

      /* Utilities */
      _,
      moment,
    }, pugData, overridePugData);
  }
}

module.exports = PluginGulpPug;
