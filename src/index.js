import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import reducer from './reducer';
import theme from './style';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
