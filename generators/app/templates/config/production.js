const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {
  domain: '',
  sass: {
    outputStyle: 'compressed',
  },
  sitemap: true,
  robots: {
    'allow': ['/'],
    'disallow': [],
  },

  /* Helper */

  isOnline: true,

  /* Assets */

  assets: {
    build: defer((config) => {
      return path.join(
        config.assets.base.online,
        config.env
      );
    }),
  },
};
