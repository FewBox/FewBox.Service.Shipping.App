import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initYardAreaPage, loadYardArea, fillYardAreaGateAreaDropdownList, fillYardAreaQuayAreaDropdownList, fillYardAreaShipyardDropdownList } from '../actions';

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
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadYardArea(payload);
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
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadYardArea(payload);
        })
    );
const constructYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_YARDAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initYardAreaPage();
        })
    );
const demolishYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_YARDAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initYardAreaPage();
        })
    );
const initGateAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_YARDAREAGATEAREADROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/gateareas', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillYardAreaGateAreaDropdownList(payload);
        })
    );
const initQuayAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_YARDAREAQUAYAREADROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/quayareas', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillYardAreaQuayAreaDropdownList(payload);
        })
    );
const initShipyardDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_YARDAREASHIPYARDDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillYardAreaShipyardDropdownList(payload);
        })
    );

export default [initYardAreaPageEpic, constructYardAreaPageEpic, switchYardAreaEpic, demolishYardAreaPageEpic, initGateAreaDropdownListEpic, initQuayAreaDropdownListEpic, initShipyardDropdownListEpic];