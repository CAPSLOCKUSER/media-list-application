require([], () => {
  console.log('hello');
  class Foo {}
  window.Foo = Foo;
});
