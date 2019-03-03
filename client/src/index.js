import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import '../src/styles/index.scss/_index.css';
import { loadUser } from './store/user/actions';

const store = configureStore();
store.dispatch(loadUser());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
