require.config({
  // to set the default folder
  baseUrl: '../build',
  // paths: maps ids with paths (no extension)
  paths: {
    'jasmine': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine'],
    'jasmine-html': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['../node_modules/jasmine-core/lib/jasmine-core/boot'],
    'sinon': ['../node_modules/sinon/lib/sinon']
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});

require(['jasmine-boot'], () => {
  require(['../test/specs/utils.spec'], () => {
    window.onload();
  });
});
