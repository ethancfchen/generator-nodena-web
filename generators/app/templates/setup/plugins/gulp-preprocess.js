const config = require('config');

/**
 * Plugin Setup: gulp-preprocess
 *
 * @module setup/plugins/gulp-preprocess
 *
 * @example {@lang javascript}
 * const PluginGulpPreprocess = require('./plugins/gulp-preprocess');
 * const pluginGulpPreprocess = PluginGulpPreprocess(assetsHelper);
 *
 * @see {@link https://github.com/jas/gulp-preprocess/|Github}
 */
class PluginGulpPreprocess {
  constructor(assetsHelper) {
    const env = config.env;
    const version = assetsHelper.getPackageJsonVersion();

    const filterOptions = (config.preprocess || {}).filter || {};

    this.context = {
      ENV: env,
      VERSION: version,
      DOMAIN: config.domain,
    };

    /* Custom */

    this.filter = filterOptions;
  }
}

module.exports = PluginGulpPreprocess;
