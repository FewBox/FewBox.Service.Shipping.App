import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShippingLanePage, initShippingLanePage } from '../actions';

const initShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPPINGLANEPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane', method: 'GET', body: action.value },
                (payload) => {
                    return loadShippingLanePage(payload);
                });
        })
    );

const startShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.START_SHIPPINGLANE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane', method: 'POST', body: action.value },
                (payload) => {
                    return loadShippingLanePage(payload);
                });
        })
    );
const closeShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CLOSE_SHIPPINGLANE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane/' + action.value, method: 'DELETE' },
                (payload) => {
                    return initShippingLanePage();
                });
        })
    );
const enableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ENABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane/mergepatch/' + action.value, method: 'PATCH', body: {metadata: { labels: {"istio-injection": "enabled"} } } },
                (payload) => {
                    return initShippingLanePage();
                });
        })
    );
const disableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DISABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane/' + action.value, method: 'PATCH', body: [ { "path": "/metadata/labels", "op": "remove", "value": "istio-injection"}] },
                (payload) => {
                    return initShippingLanePage();
                });
        })
    );

export default [initShippingLaneEpic, startShippingLaneEpic, closeShippingLaneEpic, enableIstioEpic, disableIstioEpic];