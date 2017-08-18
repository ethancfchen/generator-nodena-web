const config = require('config');

/**
 * Plugin Setup: gulp-robots
 *
 * @module setup/plugins/gulp-robots
 *
 * @example {@lang javascript}
 * const PluginGulpRobots = require('./plugins/gulp-robots');
 * const pluginGulpRobots = new PluginGulpRobots();
 *
 * @see {@link https://github.com/haydenbleasel/robots-generator/|Github}
 */
class PluginGulpRobots {
  constructor() {
    const domain = config.domain;
    const robots = config.robots || {};

    this.useragent = '*';
    this.allow = robots.allow;
    this.disallow = robots.disallow;
    this.sitemap = domain + '/sitemap.xml';
  }
}

module.exports = PluginGulpRobots;
