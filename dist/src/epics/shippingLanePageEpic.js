import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShippingLanePage, initShippingLanePage } from '../actions';
var initShippingLaneEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.INIT_SHIPPINGLANEPAGE), mergeMap(function (action) {
        return AjaxObservable({ path: '/api/shippinglane', method: 'GET', body: action.value }, function (payload) {
            return loadShippingLanePage(payload);
        });
    }));
};
var startShippingLaneEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.START_SHIPPINGLANE), mergeMap(function (action) {
        return AjaxObservable({ path: '/api/shippinglane', method: 'POST', body: action.value }, function (payload) {
            return loadShippingLanePage(payload);
        });
    }));
};
var closeShippingLaneEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.CLOSE_SHIPPINGLANE), mergeMap(function (action) {
        return AjaxObservable({ path: '/api/shippinglane/' + action.value, method: 'DELETE' }, function (payload) {
            return initShippingLanePage();
        });
    }));
};
var enableIstioEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.ENABLE_ISTIO), mergeMap(function (action) {
        return AjaxObservable({ path: '/api/shippinglane/mergepatch/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": "enabled" } } } }, function (payload) {
            return initShippingLanePage();
        });
    }));
};
var disableIstioEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.DISABLE_ISTIO), mergeMap(function (action) {
        return AjaxObservable({ path: '/api/shippinglane/' + action.value, method: 'PATCH', body: [{ "path": "/metadata/labels", "op": "remove", "value": "istio-injection" }] }, function (payload) {
            return initShippingLanePage();
        });
    }));
};
export default [initShippingLaneEpic, startShippingLaneEpic, closeShippingLaneEpic, enableIstioEpic, disableIstioEpic];
//# sourceMappingURL=shippingLanePageEpic.js.map