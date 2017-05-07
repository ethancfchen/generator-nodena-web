const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'bower_components',
  'gulp-tasks/build/bower.js',
  'gulp-tasks/build/clean.js',
  'gulp-tasks/build/copy.js',
  'gulp-tasks/build/docs.js',
  'gulp-tasks/build/extras.js',
  'gulp-tasks/build/images.js',
  'gulp-tasks/build/modernizr.js',
  'gulp-tasks/build/robots.js',
  'gulp-tasks/build/scripts.js',
  'gulp-tasks/build/sitemap.js',
  'gulp-tasks/build/styles.js',
  'gulp-tasks/main/bypass.js',
  'gulp-tasks/main/live.js',
  'gulp-tasks/main/local.js',
  'gulp-tasks/main/stage.js',
  'gulp-tasks/browserSync.js',
  'gulp-tasks/save.js',
  'gulp-tasks/watch.js',
  'setup/plugins/browser-sync.js',
  'setup/plugins/gulp-preprocess.js',
  'setup/plugins/gulp-pug.js',
  'setup/plugins/gulp-robots.js',
  'setup/plugins/gulp-sass.js',
  'setup/plugins/http-proxy-middleware.js',
  'setup/assets.js',
  'src/docs',
  'src/extras',
  'src/img',
  'src/js',
  'src/sass',
  '.editorconfig',
  '.eslintrc.js',
  '.gitignore',
  '.pug-lintrc',
  '.sass-lint.yml',
  'bower.json',
  'README.md',
  'setup.json',
  'gulptasks.js',
];
const appOnlyTemplates = [
  '_tmp_.eslintignore',
  '_tmp_.eslintrc.js',
  '_tmp_.gitignore',
];

describe('generator-nodena-web:app', () => {
  beforeAll(() => {
    const deps = [
      [helpers.createDummyGenerator(), 'nodena:app'],
    ];
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withGenerators(deps);
  });

  it('creates files', () => {
    assert.file(appAssets);
  });

  it('not includes templates', () => {
    assert.noFile(appOnlyTemplates);
  });
});
