const defer = require('config/defer').deferConfig;

module.exports = {
  domain: defer((config) => {
    return 'http://localhost:' + config.server.port;
  }),

  /* Helper */

  isOnline: false,
  browserSync: true,
};
