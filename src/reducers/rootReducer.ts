import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import master from './masterReducer';
import signin from './signinReducer';
import landing from './landingReducer';
import setting from './settingReducer';
import shippingLane from './shippingLaneReducer';

const appReducer = combineReducers({ master, signin, landing, setting, shippingLane, routing });
export default (state: any, action: any) => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action)
}