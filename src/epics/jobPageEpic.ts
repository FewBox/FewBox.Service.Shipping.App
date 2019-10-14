import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initJobPage, loadJob, beginLoading, endLoading } from '../actions';

const initJobPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SECRET_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/jobs/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/jobs', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadJob(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const createJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SECRET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/jobs', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initJobPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const deleteJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SECRET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/jobs/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initJobPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/jobs/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/jobs', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadJob(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initJobPageEpic, createJobEpic, deleteJobEpic, switchJobEpic];