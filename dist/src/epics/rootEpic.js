import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import shippingLanePageEpic from './shippingLanePageEpic';
import commonEpic from './commonEpic';
export default combineEpics.apply(void 0, commonEpic.concat(landingPageEpic, signInPageEpic, shippingLanePageEpic));
//# sourceMappingURL=rootEpic.js.map