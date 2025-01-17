import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/rootReducer'
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import history from './History/History'

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
