import { combineReducers } from 'redux';
import auth from './auth';
import posts from './post';
export const reducers = combineReducers({ posts, auth});