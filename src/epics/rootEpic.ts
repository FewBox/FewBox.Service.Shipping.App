import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import shippingLinePageEpic from './shippingLinePageEpic';
import containerShipPageEpic from './containerShipPageEpic';
import shipyardPageEpic from './shipyardPageEpic';
import quayAreaPageEpic from './quayAreaPageEpic';
import gateAreaPageEpic from './gateAreaPageEpic';
import logBookPageEpic from './logBookPageEpic';
import commonEpic from './commonEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic, ...shippingLinePageEpic, ...containerShipPageEpic, ...shipyardPageEpic,
    ...quayAreaPageEpic, ...gateAreaPageEpic, ...logBookPageEpic);