const del = require('del');
const config = require('config');

module.exports = function() {
  const assets = config.assets;
  return del([
    assets.build,
  ]);
};
