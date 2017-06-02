/**
 * Plugin Setup: gulp-preprocess
 *
 * @module setup/plugins/gulp-preprocess
 *
 * @example {@lang javascript}
 * const PluginGulpPreprocess = require('./plugins/gulp-preprocess');
 * const pluginGulpPreprocess = PluginGulpPreprocess(config, assets);
 */
class PluginGulpPreprocess {
  /**
   * @see {@link https://github.com/jas/gulp-preprocess/|Github}
   * @param  {object} config Project configurations.
   * @param  {object} assets Project assets.
   */
  constructor(config, assets) {
    const env = config.env;
    const version = assets.getPackageJsonVersion();

    const pref = assets.getPreference();

    const filterOptions = (pref.preprocess || {}).filter || {};

    this.context = {
      ENV: env,
      VERSION: version,
      DOMAIN: assets.domain,
    };

    /* Custom */
    this.filter = filterOptions;
  }
}

module.exports = PluginGulpPreprocess;
