const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks/build/clean.js',
  'gulp-tasks/build/copy.js',
  'gulp-tasks/build/docs.js',
  'gulp-tasks/build/extras.js',
  'gulp-tasks/build/images.js',
  'gulp-tasks/build/robots.js',
  'gulp-tasks/build/scripts.js',
  'gulp-tasks/build/sitemap.js',
  'gulp-tasks/build/styles.js',
  'gulp-tasks/tool/imageopt.js',
  'gulp-tasks/localServer.js',
  'gulp-tasks/watch.js',
  'config/default.js',
  'config/development.js',
  'config/stage.js',
  'config/production.js',
  'src/docs',
  'src/extras',
  'src/img',
  'src/js',
  'src/sass',
  '.editorconfig',
  '.eslintrc.js',
  '.gitignore',
  '.pug-lintrc',
  '.stylelintignore',
  '.stylelintrc.js',
  'README.md',
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
