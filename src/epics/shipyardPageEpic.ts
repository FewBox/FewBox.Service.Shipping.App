import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShipyard, initShipyardPage, fillCaptainDropdownList, fillCredentialDropdownList } from '../actions';
import { of } from 'rxjs';

const initShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyards/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/shipyards', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadShipyard(payload));
        })
    );

const switchShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyards/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/shipyards', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadShipyard(payload));
        })
    );
const changeContainerShipNumberingEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_CONTAINERSHIPNUMBERING),
        mergeMap((action) => {
            let operations = action.value.cargos.map((cargo, index) => {
                return { "op": "replace", "path": "/spec/template/spec/containers/" + index + "/image", "value": cargo };
            });
            return AjaxObservable({ path: '/api/shipyards/' + action.value.shippingLine + '/' + action.value.name, method: 'PATCH', body: operations });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShipyardPage());
        })
    );

const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/oncontainer', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShipyardPage());
        })
    );

const scaleContainerShipQuantityEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCALE_CONTAINERSHIPQUANTITY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/merge/' + action.value.shippingLine + '/' + action.value.name, method: 'PATCH', body: { spec: { replicas: action.value.quantity } } });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShipyardPage());
        })
    );

const scrapContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCRAP_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShipyardPage());
        })
    );

export default [initShipyardEpic, switchShipyardEpic, changeContainerShipNumberingEpic, constructContainerShipEpic, scaleContainerShipQuantityEpic, scrapContainerShipEpic];