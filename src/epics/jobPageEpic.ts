import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initJobPage, loadJob } from '../actions';

const initJobPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SECRET_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/jobs/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/jobs', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadJob(payload);
        })
    );

const createJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_SECRET),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/jobs', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initJobPage();
        })
    );

const deleteJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_SECRET),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/jobs/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initJobPage();
        })
    );

const switchJobEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/jobs/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/jobs', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadJob(payload);
        })
    );

export default [initJobPageEpic, createJobEpic, deleteJobEpic, switchJobEpic];