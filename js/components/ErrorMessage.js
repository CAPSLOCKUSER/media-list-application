define(['jquery', 'lib/virtual-dom'], ($, VirtualDom) => {

  const displayInterval = 3000;

  class ErrorMessage extends VirtualDom.Component {

    constructor(props) {
      super(props);
      ErrorMessage.singleton = this;
    }

    shouldComponentUpdate() { return false; }

    static showMessage(message) {
      ErrorMessage.lastCalled = new Date().getTime();
      const $this = $(ErrorMessage.singleton.$dom);
      $this
        .css('height', '40px')
        .text(message)
        .delay(displayInterval)
        .queue(next => {
          const now = new Date().getTime();
          if (ErrorMessage.lastCalled + displayInterval < now) {
            $this.css('height', '0px');
          }
          next();
        });
    }

    render() {
      return (
        <div class="error-message">
          Something went wrong.
        </div>
      );
    }
  }

  return ErrorMessage;
});
