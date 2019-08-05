import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import masterPage from './masterReducer';
import signinPage from './signinReducer';
import landingPage from './landingReducer';
import settingPage from './settingReducer';
import shippingLinePage from './shippingLineReducer';
import containerShipPage from './containerShipReducer';
import shipyardPage from './shipyardReducer';
import dockPage from './dockReducer';
import customPage from './customReducer';

const appReducer = combineReducers({ masterPage, signinPage, landingPage, settingPage, shippingLinePage, containerShipPage, shipyardPage, dockPage, customPage, routing });
export default (state: any, action: any) => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action)
}