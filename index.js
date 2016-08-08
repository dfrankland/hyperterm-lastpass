const { resolve: resolvePath } = require('path');

const MAIN = resolvePath(__dirname, './dist/main.js');

let createWindow;
exports.onApp = app => {
  createWindow = app.createWindow;
};

exports.decorateMenu = menu =>
  menu.map(
    item => {
      if (item.label !== 'Plugins') return item;
      const newItem = Object.assign({}, item);
      newItem.submenu = newItem.submenu.concat(
        {
          label: 'Lastpass',
          accelerator: 'CmdOrCtrl+L',
          click: (clickedItem, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.rpc.emit('lastpass-open');
            } else {
              createWindow(win => win.rpc.emit('lastpass-open'));
            }
          },
        }
      );
      return newItem;
    }
  );

exports.decorateTerm = (Term, { React }) => {
  const { Component, createElement } = React;

  /* eslint-disable react/prop-types */
  /* eslint-disable no-underscore-dangle */
  const LastpassTerm = class extends Component {
    constructor(props, context) {
      super(props, context);
      this._onTerminal = term => {
        if (props && props.onTerminal) props.onTerminal(term);

        const modal = require(MAIN).default(// eslint-disable-line global-require
          stringToSend => {
            if (window.store.getState().sessions.activeUid !== props.uid) return;
            term.io.sendString(stringToSend);
          }
        );

        window.rpc.on('lastpass-open', () => {
          modal.handleToggle();
        });
      };
    }

    render() {
      const { _onTerminal: onTerminal } = this;
      const newProps = Object.assign({}, this.props, { onTerminal });
      return createElement(Term, newProps);
    }
  };
  /* eslint-enable */

  return LastpassTerm;
};
