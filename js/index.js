require.config({
  paths: {
    'jquery': '../vendor/jquery-3.0.0.min',
  },
  map: {
    '*': { 'jquery': 'jquery-private' },
    'jquery-private': { 'jquery': 'jquery' }
  },
});

require(['lib/virtual-dom', 'components/App'], (VirtualDom, App) => {
  const app = <App url="http://146.185.158.18/fake_api.php" />;
  VirtualDom.register(document.body, app);
});
