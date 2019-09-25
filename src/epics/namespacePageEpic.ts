import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadNamespace, enableIstioStatus, disableIstioStatus, initNamespacePage } from '../actions';
import { IAction } from '../actions/Action';

const initNamespacePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NAMESPACEPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/namespaces/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/namespaces', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadNamespace(payload);
        })
    );

const switchNamespacePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action: IAction<boolean>) => {
            if (action.value) {
                return AjaxObservable({ path: '/api/namespaces/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/namespaces', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadNamespace(payload);
        })
    );

const createNamespaceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_NAMESPACE),
        mergeMap((action: IAction<any>) => {
            return AjaxObservable({ path: '/api/namespaces', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initNamespacePage();
        })
    );
const deleteNamespaceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_NAMESPACE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initNamespacePage();
        })
    );
const enableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ENABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": "enabled" } } } });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return enableIstioStatus(payload);
        })
    );
const disableIstioEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DISABLE_ISTIO),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/merge/' + action.value, method: 'PATCH', body: { metadata: { labels: { "istio-injection": null } } } });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return disableIstioStatus(payload);
        })
    );

export default [initNamespacePageEpic, switchNamespacePageEpic, createNamespaceEpic, deleteNamespaceEpic, enableIstioEpic, disableIstioEpic];