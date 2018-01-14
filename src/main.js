// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const elem = document.getElementById('root');
if (!elem) {
    throw 'No "root" element';
}

ReactDOM.render(<App />, elem);