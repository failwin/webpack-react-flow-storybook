// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const elem = document.getElementById('root');
if (!elem) {
    throw new Error('No "root" element');
}

ReactDOM.render(React.createElement(App, null), elem);
