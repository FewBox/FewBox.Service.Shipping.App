import { combineEpics } from 'redux-observable';
import commonEpic from './commonEpic';
import landingPageEpic from './landingPageEpic';
import signInPageEpic from './signInPageEpic';
import nodePageEpic from './nodePageEpic';
import namespacePageEpic from './namespacePageEpic';
import podPageEpic from './podPageEpic';
import deploymentPageEpic from './deploymentPageEpic';
import servicePageEpic from './servicePageEpic';
import gatewayPageEpic from './gatewayPageEpic';
import logBookPageEpic from './logBookPageEpic';
import serviceAccountPageEpic from './serviceAccountPageEpic';
import secretPageEpic from './secretPageEpic';
import virtualServicePageEpic from './virtualServicePageEpic';
import destinationRulePageEpic from './destinationRulePageEpic';
import serviceEntryPageEpic from './serviceEntryPageEpic';

export default combineEpics(...commonEpic, ...landingPageEpic, ...signInPageEpic, ...nodePageEpic, ...namespacePageEpic, ...podPageEpic, ...deploymentPageEpic,
    ...servicePageEpic, ...gatewayPageEpic, ...logBookPageEpic, ...serviceAccountPageEpic, ...secretPageEpic, ...virtualServicePageEpic, ...destinationRulePageEpic, ...serviceEntryPageEpic);