const path = require('path');
const _ = require('lodash');
const httpProxy = require('http-proxy-middleware');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.opts.browserSync;

  const assets = setup.assets;

  const browserSyncOpts = setup.plugins.browserSync;
  const proxyOpts = setup.plugins.httpProxyMiddleware;

  const plugins = [];
  const middleware = [];

  plugins.push({
    module: 'bs-html-injector',
    options: {
      files: [path.join(assets.build, assets.dest.docs)],
    },
  });

  _(proxyOpts.proxies).forEach((proxy) => {
    middleware.push(httpProxy(proxy.uri, proxy.options));
  });

  browserSyncOpts.plugins = plugins;
  browserSyncOpts.server.middleware = middleware;
  browserSync.init(browserSyncOpts);
};
