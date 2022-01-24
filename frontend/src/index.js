import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import {positions, transitions, Provider as Alertprovider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const option = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <Alertprovider template={AlertTemplate} {...option}>
    <App />
    </Alertprovider>
  </Provider>,
  document.getElementById('root')
);

