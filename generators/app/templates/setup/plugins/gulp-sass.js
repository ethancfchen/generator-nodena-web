/**
 * Plugin Setup: gulp-sass
 *
 * @module setup/plugins/gulp-sass
 */

const _ = require('lodash');

/**
 * Plugin Setup: gulp-sass
 *
 * @example {@lang javascript}
 * var gulpSass = require('./plugins/gulp-sass')(config, assets);
 *
 * @see {@link https://github.com/sass/|Github}
 * @see {@link https://github.com/sass/node-sass#options|Avaliable Options}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function(config, assets) {
  const env = config.env;
  const pref = assets.getPreference();

  const sassOptions = pref.sass || {};

  const options = _.merge({
    outputStyle: {
      local: 'expanded',
      bypass: 'compressed',
      stage: 'compressed',
      live: 'compressed',
    }[env],
  }, sassOptions);

  return options;
};
