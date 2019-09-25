import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initServiceAccountPage, loadServiceAccount } from '../actions';

const initServiceAccountPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SERVICEACCOUNTPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/serviceaccounts/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/serviceaccounts', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadServiceAccount(payload);
        })
    );

const createServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SERVICEACCOUNT),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/serviceaccounts', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initServiceAccountPage();
        })
    );

const deleteServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SERVICEACCOUNT),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/serviceaccounts/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initServiceAccountPage();
        })
    );

const switchServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/serviceaccounts/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/serviceaccounts', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadServiceAccount(payload);
        })
    );

export default [initServiceAccountPageEpic, createServiceAccountEpic, deleteServiceAccountEpic, switchServiceAccountEpic];