import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import shippingLanePageEpic from './shippingLanePageEpic';
import containerShipPageEpic from './containerShipPageEpic';
import commonEpic from './commonEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic, ...shippingLanePageEpic, ...containerShipPageEpic);