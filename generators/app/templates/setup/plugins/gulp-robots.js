/**
 * Plugin Setup: gulp-robots
 *
 * @module setup/plugins/gulp-robots
 *
 * @example {@lang javascript}
 * const PluginGulpRobots = require('./plugins/gulp-robots');
 * const pluginGulpRobots = new PluginGulpRobots(options, assets);
 *
 * @see {@link https://github.com/haydenbleasel/robots-generator/|Github}
 */
class PluginGulpRobots {
  constructor(options, assets) {
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
