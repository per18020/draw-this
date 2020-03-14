import { combineReducers } from 'redux';
import appReducer from './appReducer';
import gameReducer from './gameReducer';

export default combineReducers({ appReducer, gameReducer });