const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('config');

const ASSETS = {
  manifest: 'package.json',
};

function getVersion() {
  const assets = config.assets;
  const file = assets.manifest || ASSETS.manifest;
  const content = fs.readFileSync(file, 'utf8');
  const manifest = JSON.parse(content);
  return manifest.version;
}

function getOptions() {
  const isVerbose = config.isVerbose;
  const globals = (config.globals || {}).pug;
  const options = {};
  const defaults = {
    pretty: isVerbose,
    locals: {
      /* Constants */

      ENV: config.env,
      VERSION: getVersion(),
      DOMAIN: config.domain,

      /* Utilities */
      _,
      moment,
    },
  };

  _.merge(defaults.locals, globals);
  _.merge(options, defaults);
  return options;
}

module.exports = function() {
  const localServer = this.context.localServer;

  const assets = config.assets;
  const isOnline = config.isOnline;

  const src = assets.src.docs;
  const dest = config.root;

  const options = getOptions();

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(!isOnline, $.plumber()))
    .pipe($.pug(options))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(localServer.stream());
};
