const runSequence = require('run-sequence');

module.exports = (cb) => {
  runSequence(
    'release:version',
    'build',
    'build:sitemap',
    'build:robots',
    'release:changelog',
    'git:commit-change',
    'git:tag',
    'release:patch',
    cb
  );
};
