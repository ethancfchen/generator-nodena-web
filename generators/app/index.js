const Generator = require('yeoman-generator');

const _ = require('lodash');
const mkdirp = require('mkdirp');
const sortPackageJson = require('sort-package-json');

const ASSETS = {
  package: 'package.json',
  mkdirp: [
    'src/docs',
    'src/sass',
    'src/js',
    'src/img',
    'src/extras',
  ],
  copy: [{
    src: 'config/**/*',
    dest: 'config',
  }, {
    src: 'gulp-tasks/**/*',
    dest: 'gulp-tasks',
  }],
  copyTmp: [
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore',
  ],
  copyTpl: [
    '.editorconfig',
    '.pug-lintrc',
    '.stylelintrc.js',
    '.stylelintignore',
    'README.md',
    'gulptasks.js',
  ],
};

function extendPackage(generator) {
  const packageFile = generator.destinationPath(ASSETS.package);
  const extPackageFile = generator.templatePath(ASSETS.package);
  const manifest = generator.fs.readJSON(packageFile, {});
  const extManifest = generator.fs.readJSON(extPackageFile, {});
  const merged = _.merge(manifest, extManifest);
  generator.fs.writeJSON(packageFile, sortPackageJson(merged));
}

function createFolders() {
  ASSETS.mkdirp.forEach((dir) => {
    mkdirp(dir);
  });
}

function copyAllFiles(generator) {
  ASSETS.copy.forEach((path) => {
    generator.fs.copy(
      generator.templatePath(path.src),
      generator.destinationPath(path.dest)
    );
  });
}

function copyAllTmpFiles(generator) {
  ASSETS.copyTmp.forEach((path) => {
    generator.fs.copy(
      generator.templatePath('_tmp_' + path),
      generator.destinationPath(path)
    );
  });
}

function copyAllTplFiles(generator, template) {
  ASSETS.copyTpl.forEach((path) => {
    generator.fs.copyTpl(
      generator.templatePath(path),
      generator.destinationPath(path),
      template
    );
  });
}

module.exports = class extends Generator {
  initializing() {
    this.composeWith('nodena:app');
  }

  writing() {
    const template = {
      appname: _.kebabCase(this.appname),
      author: {
        name: this.user.git.name(),
        email: this.user.git.email(),
      },
    };
    extendPackage(this);
    createFolders();
    copyAllFiles(this);
    copyAllTmpFiles(this);
    copyAllTplFiles(this, template);
  }
};
