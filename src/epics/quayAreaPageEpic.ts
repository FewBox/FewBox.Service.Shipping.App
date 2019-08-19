import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initQuayAreaPage, loadQuayArea } from '../actions';

const initQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_QUAYAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/quayareas/fewbox', method: 'GET' },
                    (payload) => {
                        return loadQuayArea(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/quayareas', method: 'GET' },
                    (payload) => {
                        return loadQuayArea(payload);
                    });
            }
        })
    );
const switchQuayAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/quayareas/fewbox', method: 'GET' },
                    (payload) => {
                        return loadQuayArea(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/quayareas', method: 'GET' },
                    (payload) => {
                        return loadQuayArea(payload);
                    });
            }
        })
    );
const constructQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_QUAYAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/quayareas', method: 'POST', body: action.value },
                (payload) => {
                    return initQuayAreaPage();
                });
        })
    );
const demolishQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_QUAYAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/quayareas/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initQuayAreaPage();
                });
        })
    );

export default [initQuayAreaPageEpic, constructQuayAreaPageEpic, switchQuayAreaEpic, demolishQuayAreaPageEpic];