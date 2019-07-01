import { combineReducers } from 'redux';
import postsInfo from './postsInfo';
import application from './application';

const reducers = combineReducers({
    application,
    postsInfo
});

export default reducers;
