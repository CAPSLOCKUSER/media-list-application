require.config({
  baseUrl: '../build',
  paths: {
    'jasmine': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine'],
    'jasmine-html': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['../node_modules/jasmine-core/lib/jasmine-core/boot'],
    'sinon': ['../node_modules/sinon/pkg/sinon'],
    'jquery': '../vendor/jquery-3.0.0.min',
  },
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html', 'sinon']
    }
  }
});

require(['jasmine-boot'], () => {
  require([
    '../test/specs/utils.spec',
    '../test/specs/api.spec',
    '../test/specs/MediaList.spec',
    '../test/specs/virtual-dom.spec',
    '../test/specs/persistence.spec',
  ], () => {
    window.onload();
  });
});
