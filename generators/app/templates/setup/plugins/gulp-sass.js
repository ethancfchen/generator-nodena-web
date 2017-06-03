const _ = require('lodash');

/**
 * Plugin Setup: gulp-sass
 *
 * @module setup/plugins/gulp-sass
 *
 * @example {@lang javascript}
 * const PluginGulpSass = require('./plugins/gulp-sass');
 * const pluginGulpSass = new PluginGulpSass(options, assets);
 *
 * @see {@link https://github.com/sass/|Github}
 * @see {@link https://github.com/sass/node-sass#options|Avaliable Options}
 */
class PluginGulpSass {
  constructor(options, assets) {
    const env = options.env;
    const pref = assets.getPreference();

    const sassOptions = pref.sass || {};

    this.outputStyle = {
      local: 'expanded',
      bypass: 'compressed',
      stage: 'compressed',
      live: 'compressed',
    }[env];

    _.merge(this, sassOptions);
  }
}

module.exports = PluginGulpSass;
