import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initServiceAccountPage, loadServiceAccount } from '../actions';

const initServiceAccountPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SERVICEACCOUNT_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/serviceaccounts/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/serviceaccounts', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadServiceAccount(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const createServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SERVICEACCOUNT),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/serviceaccounts', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initServiceAccountPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const deleteServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SERVICEACCOUNT),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/serviceaccounts/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initServiceAccountPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchServiceAccountEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/serviceaccounts/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/serviceaccounts', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadServiceAccount(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initServiceAccountPageEpic, createServiceAccountEpic, deleteServiceAccountEpic, switchServiceAccountEpic];