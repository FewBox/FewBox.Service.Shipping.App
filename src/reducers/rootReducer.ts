import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import master from './masterReducer';
import signin from './signinReducer';
import landing from './landingReducer';
import setting from './settingReducer';

const appReducer = combineReducers({ master, signin, landing, setting, routing });
export default (state: any, action: any) => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action)
}