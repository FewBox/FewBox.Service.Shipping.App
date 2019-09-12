import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadGateArea, initGateAreaPage } from '../actions';
import { of } from 'rxjs';

const initGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gateareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gateareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadGateArea(payload));
        })
    );
const switchGateAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gateareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gateareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadGateArea(payload));
        })
    );
const constructGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_GATEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gateareas', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initGateAreaPage());
        })
    );
const demolishGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_GATEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gateareas/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initGateAreaPage());
        })
    );

export default [initGateAreaPageEpic, switchGateAreaEpic, constructGateAreaPageEpic, demolishGateAreaPageEpic];