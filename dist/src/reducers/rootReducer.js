import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import master from './masterReducer';
import signin from './signinReducer';
import landing from './landingReducer';
import setting from './settingReducer';
import shippingLane from './shippingLaneReducer';
var appReducer = combineReducers({ master: master, signin: signin, landing: landing, setting: setting, shippingLane: shippingLane, routing: routing });
export default (function (state, action) {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action);
});
//# sourceMappingURL=rootReducer.js.map