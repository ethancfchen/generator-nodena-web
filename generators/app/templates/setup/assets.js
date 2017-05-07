const fs = require('fs');
const _ = require('lodash');

const baseAssets = require('./base/assets');

const CONFIG = {
  babel: '.babelrc',
  webpack: 'webpack.config.js',
};
const BASE = {
  bower: 'bower_components/',
};
const SRC = {
  docs: ['docs/**/*.pug', '!docs/**/_*'],
  styles: ['sass/**/*.scss', '!sass/'],
  scripts: ['js/**/*.+(js|json)', '!js/**/_*'],
  images: ['img/**/*'],
  extras: ['extras/**/*'],
};
const VENDOR = 'vendor/';
const DEST = {
  docs: '**/*.html',
  styles: 'css/',
  scripts: 'js/',
  images: 'img/',
  index: 'index.html',
};

function isFileExist(path) {
  return fs.existsSync(path);
}

module.exports = function(config) {
  const assets = baseAssets(config);

  const baseSrc = assets.base.src;

  return _.merge(assets, {
    config: CONFIG,
    base: BASE,
    src: SRC,
    vendor: VENDOR,
    dest: DEST,
    watch: {
      docs: baseSrc + 'docs/**/*',
      styles: baseSrc + 'sass/**/*',
      scripts: baseSrc + 'js/**/*',
      webpack: CONFIG.webpack,
      images: baseSrc + 'img/**/*',
      extras: baseSrc + 'extras/**/*',
    },

    isFileExist,
  });
};
