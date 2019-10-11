import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadNamespace, enableIstioStatus, disableIstioStatus, initNamespacePage, beginLoading, endLoading, empty } from '../actions';
import { IAction } from '../actions/Action';

const initNamespacePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NAMESPACE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/namespaces/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/namespaces', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadNamespace(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchNamespacePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action: IAction<boolean>) => {
            if (action.value) {
                return new AjaxObservable({ path: '/api/namespaces/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/namespaces', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadNamespace(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const createNamespaceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_NAMESPACE),
        mergeMap((action: IAction<any>) => {
            return new AjaxObservable({ path: '/api/namespaces', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initNamespacePage();
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteNamespaceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_NAMESPACE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value, method: 'DELETE' });
        }),
        map((payload) => {
            return initNamespacePage();
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const enableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ENABLE_ISTIO),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": "enabled" } } } });
        }),
        map((payload) => {
            return enableIstioStatus(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const disableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DISABLE_ISTIO),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": null } } } });
        }),
        map((payload) => {
            return disableIstioStatus(payload);
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initNamespacePageEpic, switchNamespacePageEpic, createNamespaceEpic, deleteNamespaceEpic, enableIstioEpic, disableIstioEpic];