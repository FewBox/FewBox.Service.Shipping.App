import commonEpic from './commonEpic';
import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import countryPageEpic from './countryPageEpic';
import shippingLinePageEpic from './shippingLinePageEpic';
import containerShipPageEpic from './containerShipPageEpic';
import shipyardPageEpic from './shipyardPageEpic';
import quayAreaPageEpic from './quayAreaPageEpic';
import gateAreaPageEpic from './gateAreaPageEpic';
import logBookPageEpic from './logBookPageEpic';
import captainPageEpic from './captainPageEpic';
import credentialPageEpic from './credentialPageEpic';
import yardAreaPageEpic from './yardAreaPageEpic';
import stackPolicyPageEpic from './stackPolicyPageEpic';
import freeTradeAreaPageEpic from './freeTradeAreaPageEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic, ...countryPageEpic, ...shippingLinePageEpic, ...containerShipPageEpic, ...shipyardPageEpic,
    ...quayAreaPageEpic, ...gateAreaPageEpic, ...logBookPageEpic, ...captainPageEpic, ...credentialPageEpic, ...yardAreaPageEpic, ...stackPolicyPageEpic, ...freeTradeAreaPageEpic);