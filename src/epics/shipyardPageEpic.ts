import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShipyard, initShipyardPage, fillShipyardServiceAccountDropdownList, fillShipyardCredentialDropdownList } from '../actions';

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
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadShipyard(payload);
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
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadShipyard(payload);
        })
    );
const changeContainerShipNumberingEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_CONTAINERSHIPNUMBERING),
        mergeMap((action) => {
            let operations = action.value.cargos.map((cargo, index) => {
                return { "op": "replace", "path": "/spec/template/spec/containers/" + index + "/image", "value": cargo };
            });
            return AjaxObservable({ path: '/api/shipyards/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: operations });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initShipyardPage();
        })
    );

const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/oncontainer', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initShipyardPage();
        })
    );

const scaleContainerShipQuantityEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCALE_CONTAINERSHIPQUANTITY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/merge/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: { spec: { replicas: action.value.quantity } } });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initShipyardPage();
        })
    );

const scrapContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCRAP_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyards/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initShipyardPage();
        })
    );
const initServiceAccountDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDSERVICEACCOUNTDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/serviceaccounts', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillShipyardServiceAccountDropdownList(payload);
        })
    );
const initCredentialDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDCREDENTIALDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/credentials', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillShipyardCredentialDropdownList(payload);
        })
    );

export default [initShipyardEpic, switchShipyardEpic, changeContainerShipNumberingEpic, constructContainerShipEpic, scaleContainerShipQuantityEpic, scrapContainerShipEpic, initServiceAccountDropdownListEpic, initCredentialDropdownListEpic];