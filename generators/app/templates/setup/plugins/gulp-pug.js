const _ = require('lodash');
const moment = require('moment');

/**
 * Plugin Setup: gulp-pug
 *
 * @module setup/plugins/gulp-pug
 *
 * @example {@lang javascript}
 * const PluginGulpPug = require('./plugins/gulp-pug');
 * const pluginGulpPug = new PluginGulpPug(options, assets);
 *
 * @see {@link https://github.com/jamen/gulp-pug/|Github}
 * @see {@link https://pugjs.org/api/reference.html#options|Avaliable Options}
 */
class PluginGulpPug {
  constructor(options, assets) {
    const env = options.env;
    const argv = options.argv || {};
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
