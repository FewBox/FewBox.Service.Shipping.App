import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initStackPolicyPage, loadStackPolicy, fillStackPolicyQuayAreaDropdownList, fillStackPolicyShipyardDropdownList } from '../actions';

const initStackPolicyPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_STACKPOLICYPAGE),
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
            return loadStackPolicy(payload);
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
            return loadStackPolicy(payload);
        })
    );
const draftStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DRAFT_STACKPOLICY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/stackpolicies', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initStackPolicyPage();
        })
    );
const abolishStackPolicyEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ABOLISH_STACKPOLICY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/stackpolicies/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initStackPolicyPage();
        })
    );
const initQuayAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_STACKPOLICYQUAYAREADROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/quayareas', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillStackPolicyQuayAreaDropdownList(payload);
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

export default [initStackPolicyPageEpic, draftStackPolicyEpic, switchStackPolicyEpic, abolishStackPolicyEpic, initQuayAreaDropdownListEpic, initShipyardDropdownListEpic];