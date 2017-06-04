const _ = require('lodash');

/**
 * Plugin Setup: http-proxy-middleware
 *
 * @module setup/plugins/http-proxy-middleware
 *
 * @example {@lang javascript}
 * const PluginHttpProxyMiddleware =
 *      require('./plugins/http-proxy-middleware');
 * const pluginHttpProxyMiddleware =
 *      new PluginHttpProxyMiddleware(options, assets);
 *
 * @see {@link https://github.com/chimurai/http-proxy-middleware/|Github}
 * @see {@link https://github.com/chimurai/http-proxy-middleware#options|Avaliable Options}
 */
class PluginHttpProxyMiddleware {
  constructor(options, assets) {
    const pref = assets.getPreference();
    const proxy = pref.proxy || [];

    this.proxies = _(proxy).map((item) => {
      return {
        uri: item.uri,
        options: item.options,
      };
    });
  }
}

module.exports = PluginHttpProxyMiddleware;
