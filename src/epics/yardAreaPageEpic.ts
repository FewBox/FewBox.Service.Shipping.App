import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initYardAreaPage, loadYardArea } from '../actions';
import { of } from 'rxjs';

const initYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_YARDAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/yardareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/yardareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadYardArea(payload));
        })
    );
const switchYardAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/yardareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/yardareas', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadYardArea(payload));
        })
    );
const constructYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_YARDAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initYardAreaPage());
        })
    );
const demolishYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_YARDAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initYardAreaPage());
        })
    );

export default [initYardAreaPageEpic, constructYardAreaPageEpic, switchYardAreaEpic, demolishYardAreaPageEpic];