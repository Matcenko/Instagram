import { createStore } from 'redux';
import reducers from '../reducers';

export default (preloadedState) => createStore(reducers, preloadedState);
