import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './index';
let store = null;

export default (state = {}) => {
	store = createStore(reducers, state, applyMiddleware(thunk));
	return store;
};

export function getStore() {
	return store;
}
