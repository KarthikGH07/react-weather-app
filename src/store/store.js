import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //for async operations
import rootReducer from '../reducers';

/*use redux devtool only in development and testing */
const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
