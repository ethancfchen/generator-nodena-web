/**
 * Plugin Setup: gulp-robots
 *
 * @module setup/plugins/gulp-robots
 */

/**
 * Plugin Setup: gulp-robots
 *
 * @example {@lang javascript}
 * var gulpRobots = require('./plugins/gulp-robots')(config, assets);
 *
 * @see {@link https://github.com/haydenbleasel/robots-generator/|Github}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */

class PluginGulpRobots {
  constructor(config, assets) {
    const pref = assets.getPreference();

    const domain = assets.domain;
    const robots = pref.robots || {};

    this.useragent = '*';
    this.allow = robots.allow;
    this.disallow = robots.disallow;
    this.sitemap = domain + '/sitemap.xml';
  }
}

module.exports = PluginGulpRobots;
