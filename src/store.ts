import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));

const initialState = {};

const store = createStore(rootReducer, initialState, enhancers);

export default store;
