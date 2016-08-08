import React from 'react';
import { render } from 'react-dom';
import style from './style.scss';
import Lastpass from './views/Lastpass';

let node;

// Prevent attaching multiple modals ;)
const styleRoot = style.root;
try {
  node = document.querySelector(`.${styleRoot}`)[0];
} catch (err) {
  const element = document.createElement('div');
  element.className = styleRoot;
  node = document.body.appendChild(element);
}

const root = sendString => render(<Lastpass style={style} sendString={sendString} />, node);

export default root;
