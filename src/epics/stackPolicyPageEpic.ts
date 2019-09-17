import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initStackPolicyPage, loadStackPolicy } from '../actions';

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
            debugger;
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

export default [initStackPolicyPageEpic, draftStackPolicyEpic, switchStackPolicyEpic, abolishStackPolicyEpic];