import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShippingLine, enableIstioStatus, disableIstioStatus, initShippingLinePage } from '../actions';
import { IAction } from '../actions/Action';
import { of } from 'rxjs';

const initShippingLinePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPPINGLINEPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shippinglines/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/shippinglines', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadShippingLine(payload));
        })
    );

const switchShippingLinePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action: IAction<boolean>) => {
            if (action.value) {
                return AjaxObservable({ path: '/api/shippinglines/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/shippinglines', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadShippingLine(payload));
        })
    );

const startShippingLineEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.START_SHIPPINGLINE),
        mergeMap((action: IAction<any>) => {
            return AjaxObservable({ path: '/api/shippinglines', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShippingLinePage());
        })
    );
const closeShippingLineEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CLOSE_SHIPPINGLINE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initShippingLinePage());
        })
    );
const enableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ENABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": "enabled" } } } });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(enableIstioStatus(payload));
        })
    );
const disableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DISABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": null } } } });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(disableIstioStatus(payload));
        })
    );

export default [initShippingLinePageEpic, switchShippingLinePageEpic, startShippingLineEpic, closeShippingLineEpic, enableIstioEpic, disableIstioEpic];