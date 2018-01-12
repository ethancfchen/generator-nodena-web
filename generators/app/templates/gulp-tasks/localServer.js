const path = require('path');
const _ = require('lodash');
const httpProxyMiddleware = require('http-proxy-middleware');
const config = require('config');

function getMiddlewares() {
  const localServer = config.localServer || {};
  const proxies = localServer.proxy || [];
  const middlewares = Array.prototype.map.call(proxies, (proxy) => {
    return httpProxyMiddleware(proxy.uri, proxy.options);
  });
  return middlewares;
}

function getPlugins() {
  const assets = config.assets;
  const plugins = [{
    module: 'bs-html-injector',
    options: {
      files: [path.join(assets.build, assets.dest.docs)],
    },
  }];
  return plugins;
}

function getOptions() {
  const localServer = config.localServer || {};
  const browserSync = localServer.browserSync || {};
  const options = {};
  const defaults = {
    startPath: config.root,
    server: {
      baseDir: config.assets.build,
      index: 'index.html',
      middleware: getMiddlewares(),
    },
    plugins: getPlugins(),
    https: false,
  };

  _.merge(options, defaults, browserSync);
  return options;
}

module.exports = function(taskDone) {
  const localServer = this.context.localServer;
  const options = getOptions();
  localServer.init(options);
  taskDone();
};
