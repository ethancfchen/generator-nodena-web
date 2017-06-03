const _ = require('lodash');

const httpProxy = require('http-proxy-middleware');

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = new Setup(env);
  const assets = setup.assets;

  const browserSyncOpts = setup.plugins.browserSync;
  const proxyOpts = setup.plugins.httpProxyMiddleware;

  const plugins = [];
  const middleware = [];

  plugins.push({
    module: 'bs-html-injector',
    options: {
      files: [assets.dist + assets.dest.docs],
    },
  });

  _(proxyOpts.proxies).forEach((proxy) => {
    middleware.push(httpProxy(proxy.route, proxy.options));
  });

  browserSyncOpts.plugins = plugins;
  browserSyncOpts.server.middleware = middleware;
  browserSync.init(browserSyncOpts);
};
