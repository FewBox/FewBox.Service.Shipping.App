import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import masterPage from './masterReducer';
import signinPage from './signinReducer';
import landingPage from './landingReducer';
import settingPage from './settingReducer';
import nodePage from './nodeReducer';
import namespacePage from './namespaceReducer';
import podPage from './podReducer';
import deploymentPage from './deploymentReducer';
import servicePage from './serviceReducer';
import gatewayPage from './gatewayReducer';
import logBookPage from './logBookReducer';
import serviceAccountPage from './serviceAccountReducer';
import secretPage from './secretReducer';
import virtualServicePage from './virtualServiceReducer';
import destinationRulePage from './destinationRuleReducer';
import serviceEntryPage from './serviceEntryReducer';

const appReducer = combineReducers({
    masterPage, signinPage, landingPage, settingPage, countryPage: nodePage, namespacePage, containerShipPage: podPage, shipyardPage: deploymentPage, quayAreaPage: servicePage,
    gateAreaPage: gatewayPage, logBookPage, serviceAccountPage, secretPage, yardAreaPage: virtualServicePage, destinationRulePage, freeTradeAreaPage: serviceEntryPage, routing
});
export default (state: any, action: any) => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action)
}