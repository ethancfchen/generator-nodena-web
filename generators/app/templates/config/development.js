const SERVER_PORT = 8080;

module.exports = {
  domain: `http://localhost:${SERVER_PORT}`,
  localServer: {
    browserSync: {
      port: SERVER_PORT,
      ui: {
        port: SERVER_PORT + 1,
      },
    },
  },

  /* Helper */

  isOnline: false,
};
