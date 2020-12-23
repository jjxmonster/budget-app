import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n/i18n'
import {Provider} from 'react-redux'
import App from './App.jsx';
import configureStore from './data/store'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);
