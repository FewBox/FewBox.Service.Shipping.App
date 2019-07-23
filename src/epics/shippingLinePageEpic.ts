import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShippingLine, initShippingLinePage, addShippingLine, removeShippingLine, enableIstioStatus, disableIstioStatus } from '../actions';
import { IAction } from '../actions/Action';

const initShippingLinePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPPINGLINEPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippingline', method: 'GET', body: action.value },
                (payload) => {
                    return loadShippingLine(payload);
                });
        })
    );

const startShippingLineEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.START_SHIPPINGLINE),
        mergeMap((action: IAction<string>) => {
            return AjaxObservable({ path: '/api/shippingline', method: 'POST', body: { name: action.value.toLowerCase() } },
                (payload) => {
                    return addShippingLine(action.value.toLowerCase());
                });
        })
    );
const closeShippingLineEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CLOSE_SHIPPINGLINE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippingline/' + action.value, method: 'DELETE' },
                (payload) => {
                    return removeShippingLine(action.value);
                });
        })
    );
const enableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ENABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippingline/mergepatch/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": "enabled" } } } },
                (payload) => {
                    return enableIstioStatus(action.value);
                });
        })
    );
const disableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DISABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippingline/' + action.value, method: 'PATCH', body: [{ "path": "/metadata/labels", "op": "remove", "value": "istio-injection" }] },
                (payload) => {
                    return disableIstioStatus(action.value);
                });
        })
    );

export default [initShippingLinePageEpic, startShippingLineEpic, closeShippingLineEpic, enableIstioEpic, disableIstioEpic];