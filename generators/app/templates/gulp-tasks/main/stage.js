const runSequence = require('run-sequence');

module.exports = (cb) => {
  runSequence(
    'release:version',
    'build',
    'release:changelog',
    'git:commit-change',
    'git:tag',
    'release:patch',
    cb
  );
};
