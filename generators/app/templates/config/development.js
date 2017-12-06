const argv = require('../setup/argv');

const serverPort = argv.port || 8080;

module.exports = {
  domain: `http://localhost:${serverPort}`,
  localServer: {
    browserSync: {
      port: serverPort,
      ui: {
        port: serverPort + 1,
      },
    },
  },

  /* Helper */

  isOnline: false,
};
