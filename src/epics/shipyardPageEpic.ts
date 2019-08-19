import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShipyard, initShipyardPage } from '../actions';

const initShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyards/fewbox', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/shipyards', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
        })
    );

const switchShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyards/fewbox', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/shipyards', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
        })
    );

const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards', method: 'POST', body: action.value },
                (payload) => {
                    return initShipyardPage();
                });
        })
    );

const scaleContainerShipQuantityEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCALE_CONTAINERSHIPQUANTITY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/mergepatch/' + action.value.shippingLine + '/' + action.value.name, method: 'PATCH', body: { spec: { replicas: action.value.quantity } } },
                (payload) => {
                    return initShipyardPage();
                });
        })
    );

const scrapContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCRAP_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initShipyardPage();
                });
        })
    );

export default [initShipyardEpic, switchShipyardEpic, constructContainerShipEpic, scaleContainerShipQuantityEpic, scrapContainerShipEpic];