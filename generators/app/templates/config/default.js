const path = require('path');
const defer = require('config/defer').deferConfig;

const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;

const argv = require('yargs').option({
  b: {
    alias: 'verbose',
  },
}).argv;

module.exports = {
  root: '.',
  proxy: [],
  globals: {
    pug: {},
    sass: {},
    js: {},
    extras: {},
  },
  preprocess: {
    filter: {
      sass: ['**/*.css'],
      js: ['**/*.js'],
      extras: ['!**/*'],
    },
  },
  sass: {
    outputStyle: 'expanded',
    includePaths: [],
  },
  postcss: {
    cssnext: {},
    gradientfixer: {},
    flexbugsFixes: {},
    mergeLonghand: {},
    mergeRules: {},
    clipPathPolyfill: {},
    cssnano: {
      autoprefixer: false,
    },
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
  localServer: false,

  /* Helper */

  env: NODE_ENV,
  appInstance: NODE_APP_INSTANCE,
  isOnline: false,
  isVerbose: argv.verbose,

  /* Assets */

  assets: {
    base: {
      src: 'src',
      build: 'build',
      dist: 'dist',
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
    dist: {
      patches: defer((config) => {
        return path.join(config.assets.base.dist, 'patches');
      }),
    },
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
    jsdoc: {
      files: [
        './*.js',
      ],
      dest: 'doc',
    },

    config: {
      babel: '.babelrc',
      webpack: 'webpack.config.js',
    },
    manifest: 'package.json',
    readme: 'README.md',
  },
};
