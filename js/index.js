require(['lib/virtual-dom', 'components/App'], (VirtualDom, App) => {
  VirtualDom.register(document.body, <App />);
});
