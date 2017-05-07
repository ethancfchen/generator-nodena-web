const del = require('del');
const path = require('path');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;

  return del([
    assets.dist,
    path.join(assets.base.src, assets.vendor),
  ]);
};
