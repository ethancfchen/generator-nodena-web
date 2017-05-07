const runSequence = require('run-sequence');

module.exports = function(cb) {
  runSequence(
    'release:version',
    'build',
    'save',
    'release:changelog',
    'git:commit-change',
    'git:tag',
    'release:patch',
    cb
  );
};
