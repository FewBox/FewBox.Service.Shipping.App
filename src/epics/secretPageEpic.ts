import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initSecretPage, loadSecret, fillSelectedSecret } from '../actions';

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
        catchError((errorAction) => {
            return errorAction;
        })
    );

const selectSecretEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SELECT_SECRET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/secrets/' + action.value.namespace + '/' + action.value.name, method: 'GET' });
        }),
        map((payload) => {
            let datas = Object.keys(payload.datas).map((key, index) => {
                return { key: key, value: payload.datas[key] };
            });
            return fillSelectedSecret({ datas: datas });
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const changeSecretDataEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_SECRET_DATA),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/secrets/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: [{ "op": "replace", "path": "/data", "value": action.value.datas }] });
        }),
        map((payload) => {
            return initSecretPage();
        }),
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
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initSecretPageEpic, createSecretEpic, deleteSecretEpic, selectSecretEpic, changeSecretDataEpic, switchSecretEpic];