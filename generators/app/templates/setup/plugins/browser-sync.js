const config = require('config');
const _ = require('lodash');

/**
 * Plugin Setup: Browsersync
 *
 * @module setup/plugins/browser-sync
 *
 * @example {@lang javascript}
 * const PluginBrowserSync = require('./plugins/browser-sync');
 * const pluginBrowserSync = new PluginBrowserSync();
 *
 * @see {@link https://www.browsersync.io/|Official Site}
 * @see {@link https://www.browsersync.io/docs/options/|Avaliable Options}
 * @see {@link https://github.com/browsersync/browser-sync/|Github}
 */
class PluginBrowserSync {
  constructor() {
    const localServer = config.localServer || {};
    const browserSync = localServer.browserSync || {};

    _.merge(this, {
      startPath: config.root,
      server: {
        baseDir: config.assets.build,
        index: 'index.html',
      },
      https: false,
    }, browserSync);
  }
}

module.exports = PluginBrowserSync;
