import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initCaptainPage, loadCaptain } from '../actions';

const initCaptainPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CAPTAINPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/captains/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/captains', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadCaptain(payload);
        })
    );

const trainCaptainEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.TRAIN_CAPTAIN),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/captains', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initCaptainPage();
        })
    );

const fireCaptainEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.FIRE_CAPTAIN),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/captains/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initCaptainPage();
        })
    );

const switchCaptainEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/captains/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/captains', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadCaptain(payload);
        })
    );

export default [initCaptainPageEpic, trainCaptainEpic, fireCaptainEpic, switchCaptainEpic];