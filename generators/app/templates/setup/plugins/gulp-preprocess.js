/**
 * Plugin Setup: gulp-preprocess
 *
 * @module setup/plugins/gulp-preprocess
 */

/**
 * Plugin Setup: gulp-preprocess
 *
 * @example {@lang javascript}
 * var gulpPreprocess = require('./plugins/gulp-preprocess')(config, assets);
 *
 * @see {@link https://github.com/jas/gulp-preprocess/|Github}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function(config, assets) {
  const env = config.env;
  const version = assets.getPackageJsonVersion();

  const pref = assets.getPreference();

  const filterOptions = (pref.preprocess || {}).filter || {};

  const options = {
    context: {
      ENV: env,
      VERSION: version,
      DOMAIN: assets.domain,
    },

    /* Custom */
    filter: filterOptions,
  };

  return options;
};
