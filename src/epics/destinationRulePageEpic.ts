import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { zip } from 'rxjs';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initDestinationRulePage, loadDestinationRule, fillStackPolicyServiceDropdownList, fillStackPolicyShipyardDropdownList, fillSelectedStackPolicyShipyardDropdownList } from '../actions';

const initDestinationRulePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DESTINATIONRULEPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/stackpolicies/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/stackpolicies', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadDestinationRule(payload);
        })
    );
const switchStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/stackpolicies/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/stackpolicies', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadDestinationRule(payload);
        })
    );
const draftStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_DESTINATIONRULE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/stackpolicies', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDestinationRulePage();
        })
    );
const abolishStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_DESTINATIONRULE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/stackpolicies/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDestinationRulePage();
        })
    );
const changeContainerShipNumberingEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_DESTINATIONRULESUBSET),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/stackpolicies/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: [{ "op": "replace", "path": "/spec/subsets", "value": action.value.subsets }] });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDestinationRulePage();
        })
    );
const initQuayAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_STACKPOLICYSERVICEDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/quayareas', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillStackPolicyServiceDropdownList(payload);
        })
    );
const initShipyardDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_STACKPOLICYSHIPYARDDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillStackPolicyShipyardDropdownList(payload);
        })
    );
const selectStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SELECT_STACKPOLICY),
        switchMap((action) => {
            return zip(AjaxObservable({ path: '/api/namespaces/' + action.value.namespace + '/stackpolicies/' + action.value.name, method: 'GET' }),
                AjaxObservable({ path: '/api/shipyards?labels=app=' + action.value.name, method: 'GET' }));
        }),
        map((payloads) => {
            for (var key in payloads) {
                if (payloads[key].type) {
                    return payloads[key];
                }
            }
            return fillSelectedStackPolicyShipyardDropdownList({ subsets: payloads[0].subsets, deployments: payloads[1] });
        })
    );

export default [initDestinationRulePageEpic, draftStackPolicyEpic, switchStackPolicyEpic, abolishStackPolicyEpic, initQuayAreaDropdownListEpic, initShipyardDropdownListEpic, selectStackPolicyEpic, changeContainerShipNumberingEpic];