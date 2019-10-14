import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initServiceEntryPage, loadServiceEntry } from '../actions';

const initServiceEntryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SERVICEENTRY_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/serviceentries/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/serviceentries', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadServiceEntry(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const switchServiceEntryEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/serviceentries/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/serviceentries', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadServiceEntry(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createServiceEntryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SERVICEENTRY),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/serviceentries', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initServiceEntryPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteServiceEntryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SERVICEENTRY),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/serviceentries/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initServiceEntryPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initServiceEntryPageEpic, createServiceEntryPageEpic, switchServiceEntryEpic, deleteServiceEntryPageEpic];