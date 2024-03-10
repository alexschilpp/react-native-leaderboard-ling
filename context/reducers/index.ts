import {combineReducers} from 'redux';
import userTableReducer from './userTableReducer';

const appReducer = combineReducers({
    userTable: userTableReducer
})

export default appReducer;
