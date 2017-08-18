const del = require('del');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;
  return del([
    assets.build,
  ]);
};
