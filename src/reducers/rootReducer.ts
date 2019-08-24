import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import masterPage from './masterReducer';
import signinPage from './signinReducer';
import landingPage from './landingReducer';
import settingPage from './settingReducer';
import countryPage from './countryReducer';
import shippingLinePage from './shippingLineReducer';
import containerShipPage from './containerShipReducer';
import shipyardPage from './shipyardReducer';
import quayAreaPage from './quayAreaReducer';
import gateAreaPage from './gateAreaReducer';
import logBookPage from './logBookReducer';
import captainPage from './captainReducer';

const appReducer = combineReducers({ masterPage, signinPage, landingPage, settingPage, countryPage, shippingLinePage, containerShipPage, shipyardPage, quayAreaPage, gateAreaPage, logBookPage, captainPage, routing });
export default (state: any, action: any) => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action)
}