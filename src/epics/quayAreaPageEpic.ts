import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initQuayAreaPage, loadQuayArea } from '../actions';
import { of } from 'rxjs';

const initQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_QUAYAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/quayareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/quayareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadQuayArea(payload));
        })
    );
const switchQuayAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/quayareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/quayareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadQuayArea(payload));
        })
    );
const constructQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_QUAYAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/quayareas', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initQuayAreaPage());
        })
    );
const demolishQuayAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_QUAYAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/quayareas/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initQuayAreaPage());
        })
    );

export default [initQuayAreaPageEpic, constructQuayAreaPageEpic, switchQuayAreaEpic, demolishQuayAreaPageEpic];