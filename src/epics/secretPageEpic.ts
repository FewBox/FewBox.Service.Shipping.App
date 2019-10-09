import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError, startWith, endWith } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initSecretPage, loadSecret, beginLoading, endLoading } from '../actions';

const initSecretPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SECRET_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/secrets/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/secrets', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadSecret(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const createSecretEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SECRET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/secrets', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initSecretPage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const deleteSecretEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SECRET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/secrets/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initSecretPage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchSecretEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/secrets/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/secrets', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadSecret(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initSecretPageEpic, createSecretEpic, deleteSecretEpic, switchSecretEpic];