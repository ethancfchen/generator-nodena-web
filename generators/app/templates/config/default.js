const path = require('path');
const defer = require('config/defer').deferConfig;

const NODE_ENV = process.env.NODE_ENV;
const argv = require('../setup/argv');

module.exports = {
  root: '',
  server: {
    port: argv.port || 8080,
    index: 'index.html',
    https: false,
  },
  proxy: [],
  globals: {
    pug: {},
    sass: {},
    js: {},
    extras: {},
  },
  preprocess: {
    filter: {
      sass: ['**/*.scss'],
      js: ['**/*.js'],
      extras: ['!**/*'],
    },
  },
  sass: {
    outputStyle: 'expanded',
    includePaths: [],
  },
  doiuse: {
    browsers: [
      'last 2 version',
      '> 5%',
      'not ie < 11',
      'not ie_mob < 11',
    ],
    ignore: [
      'viewport-units',
      'css-appearance',
      'flexbox',
      'text-size-adjust',
      'rem',
    ],
  },
  modernizr: {
    options: [
      'prefixed',
      'addTest',
      'setClasses',
    ],
  },
  uglify: {
    output: {
      beautify: false,
      comments: /^\/*!/,
    },
  },
  imagemin: {
    main: {
      verbose: true,
    },
    plugins: {
      gifsicle: {
        interlaced: true,
      },
      jpegtran: {
        progressive: true,
      },
      optipng: { },
      svgo: { },
    },
  },
  copy: [],
  sitemap: false,
  robots: false,

  /* Helper */

  env: NODE_ENV,
  isOnline: false,
  isVerbose: argv.verbose,

  /* Assets */

  assets: {
    base: {
      src: 'src',
      build: 'build',
      online: 'online',
      res: 'res',
    },
    src: {
      docs: ['docs/**/*.pug', '!docs/**/_*'],
      styles: ['sass/**/*.scss', '!sass/'],
      scripts: ['js/**/*.+(js|json)', '!js/**/_*'],
      images: ['img/**/*'],
      extras: ['extras/**/*'],
    },
    build: defer((config) => {
      return config.assets.base.build;
    }),
    dest: {
      docs: '**/*.html',
      styles: 'css',
      scripts: 'js',
      images: 'img',
      index: 'index.html',
    },
    watch: {
      docs: defer((config) => {
        return path.join(config.assets.base.src, 'docs/**/*');
      }),
      styles: defer((config) => {
        return path.join(config.assets.base.src, 'sass/**/*');
      }),
      scripts: defer((config) => {
        return path.join(config.assets.base.src, 'js/**/*');
      }),
      images: defer((config) => {
        return path.join(config.assets.base.src, 'img/**/*');
      }),
      extras: defer((config) => {
        return path.join(config.assets.base.src, 'extras/**/*');
      }),
    },

    config: {
      babel: '.babelrc',
      webpack: 'webpack.config.js',
    },
    manifest: 'package.json',
    readme: 'README.md',
    changelog: 'CHANGELOG.md',
    template: {
      changelog: path.join('res', 'changelog.template.md'),
    },
  },
};