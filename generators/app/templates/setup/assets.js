const fs = require('fs');

const BaseAssets = require('./base/assets');

const CONFIG = {
  babel: '.babelrc',
  webpack: 'webpack.config.js',
};
const SRC = {
  docs: ['docs/**/*.pug', '!docs/**/_*'],
  styles: ['sass/**/*.scss', '!sass/'],
  scripts: ['js/**/*.+(js|json)', '!js/**/_*'],
  images: ['img/**/*'],
  extras: ['extras/**/*'],
};
const DEST = {
  docs: '**/*.html',
  styles: 'css/',
  scripts: 'js/',
  images: 'img/',
  index: 'index.html',
};

class Assets extends BaseAssets {
  constructor(options) {
    super(options);

    const baseSrc = this.base.src;

    this.config = CONFIG;
    this.src = SRC;
    this.dest = DEST;
    this.watch = {
      docs: baseSrc + 'docs/**/*',
      styles: baseSrc + 'sass/**/*',
      scripts: baseSrc + 'js/**/*',
      webpack: CONFIG.webpack,
      images: baseSrc + 'img/**/*',
      extras: baseSrc + 'extras/**/*',
    };
  }

  isFileExist(path) {
    return fs.existsSync(path);
  }
}

module.exports = Assets;
