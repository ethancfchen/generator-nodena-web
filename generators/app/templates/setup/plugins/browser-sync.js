const config = require('config');
const argv = require('../argv');

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
    const server = config.server || {};
    const port = argv.port || server.port;
    const isHttps = server.https;

    this.port = port;
    this.server = {
      baseDir: config.assets.build,
      index: server.index,
    };
    this.https = isHttps;
    this.ui = {
      port: port + 1,
    };
    this.startPath = config.root;

    if (!port) {
      delete this.port;
      delete this.ui.port;
    }
  }
}

module.exports = PluginBrowserSync;
