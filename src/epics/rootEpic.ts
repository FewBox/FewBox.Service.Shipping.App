import commonEpic from './commonEpic';
import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import countryPageEpic from './countryPageEpic';
import namespacePageEpic from './namespacePageEpic';
import containerShipPageEpic from './containerShipPageEpic';
import shipyardPageEpic from './shipyardPageEpic';
import quayAreaPageEpic from './quayAreaPageEpic';
import gateAreaPageEpic from './gateAreaPageEpic';
import logBookPageEpic from './logBookPageEpic';
import serviceAccountPageEpic from './serviceAccountPageEpic';
import credentialPageEpic from './credentialPageEpic';
import yardAreaPageEpic from './yardAreaPageEpic';
import stackPolicyPageEpic from './stackPolicyPageEpic';
import freeTradeAreaPageEpic from './freeTradeAreaPageEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic, ...countryPageEpic, ...namespacePageEpic, ...containerShipPageEpic, ...shipyardPageEpic,
    ...quayAreaPageEpic, ...gateAreaPageEpic, ...logBookPageEpic, ...serviceAccountPageEpic, ...credentialPageEpic, ...yardAreaPageEpic, ...stackPolicyPageEpic, ...freeTradeAreaPageEpic);