const requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: 'build',
});

module.exports = requirejs;
