import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './store';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const dest = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , dest);

if (process.env.NODE_ENV === 'development' && process.env.__DEVTOOLS__) {
  window.React = React; // enable debugger

  if (!window.devToolsExtension) {
    const DevTools = require('./components').DevTools; // eslint-disable-line global-require
    const devToolsDest = document.createElement('div');

    dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
    ReactDOM.render(
    <Provider store={store} key="provider">
      <DevTools />
      </Provider>,
      devToolsDest
  );
  }
}