const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {
  domain: '',
  sitemap: true,
  robots: {
    allow: ['/'],
    disallow: [],
  },
  localServer: false,

  /* Helper */

  isOnline: true,

  /* Assets */

  assets: {
    build: defer((config) => {
      return path.join(
        config.assets.base.dist,
        config.env
      );
    }),
  },
};
