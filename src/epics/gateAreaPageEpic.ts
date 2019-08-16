import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadGateArea, initGateAreaPage } from '../actions';

const initGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gatearea/fewbox', method: 'GET' },
                    (payload) => {
                        return loadGateArea(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/gatearea', method: 'GET' },
                    (payload) => {
                        return loadGateArea(payload);
                    });
            }
        })
    );
const switchGateAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gatearea/fewbox', method: 'GET' },
                    (payload) => {
                        return loadGateArea(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/gatearea', method: 'GET' },
                    (payload) => {
                        return loadGateArea(payload);
                    });
            }
        })
    );
const constructGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_GATEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gatearea', method: 'POST', body: action.value },
                (payload) => {
                    return initGateAreaPage();
                });
        })
    );
const demolishGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_GATEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gatearea/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initGateAreaPage();
                });
        })
    );

export default [initGateAreaPageEpic, switchGateAreaEpic, constructGateAreaPageEpic, demolishGateAreaPageEpic];