import { combineEpics } from 'redux-observable';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import commonEpic from './commonEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic);