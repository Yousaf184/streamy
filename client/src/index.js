import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/app/app';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { reducer as reducerReduxForms } from 'redux-form';
import { reducerAuth, reducerStreams } from './redux-setup/reducers';
import './style.css';

// redux dev tools extension setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    reducerAuth,
    reducerStreams,
    form: reducerReduxForms  // from redux forms
});

const store = createStore (
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
