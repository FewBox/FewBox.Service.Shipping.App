import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initServicePage, loadService, beginLoading, endLoading } from '../actions';

const initServiePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SERVICE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/services/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/services', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadService(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const switchServiceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/services/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/services', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadService(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SERVICE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/services', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initServicePage();
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SERVICE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/services/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initServicePage();
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initServiePageEpic, createServicePageEpic, switchServiceEpic, deleteServicePageEpic];