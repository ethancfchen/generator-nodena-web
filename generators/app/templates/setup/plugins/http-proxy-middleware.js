/**
 * Plugin Setup: http-proxy-middleware
 *
 * @module setup/plugins/http-proxy-middleware
 */

const _ = require('lodash');

/**
 * Plugin Setup: http-proxy-middleware
 *
 * @example {@lang javascript}
 * var httpProxyMiddleware =
 *      require('./plugins/http-proxy-middleware')(config, assets);
 *
 * @see {@link https://github.com/chimurai/http-proxy-middleware/|Github}
 * @see {@link https://github.com/chimurai/http-proxy-middleware#options|Avaliable Options}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function(config, assets) {
  const pref = assets.getPreference();
  const proxy = pref.proxy || [];

  const options = _(proxy).map((item) => {
    return {
      route: item.route,
      options: {
        target: item.target,
        changeOrigin: true,
        secure: !item.selfCert,
      },
    };
  });
  return options;
};
