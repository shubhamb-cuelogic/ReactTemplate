import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import 'semantic-ui-css/semantic.min.css'

const getUserData = () => {
  if (!localStorage.getItem('user')) {
    return null
  }
  const user = localStorage.getItem('user');
  return user ? (typeof (user) == 'object' ? user : JSON.parse(user)) : null;
}

ReactDOM.render(
  <Provider store={configureStore(getUserData())}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
