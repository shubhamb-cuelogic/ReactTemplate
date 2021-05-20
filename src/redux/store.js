import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        {
            User: {
                user: initialState
            }
        },
        composeWithDevTools(
            applyMiddleware(thunk),
        ));
    return store;
}

