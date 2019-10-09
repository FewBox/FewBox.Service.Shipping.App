import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadPod, initPodPage, fillPodServiceAccountDropdownList, beginLoading, endLoading } from '../actions';

const initPodEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_POD_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/pods/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/pods', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadPod(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchPodEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/pods/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/pods', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadPod(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deletePodEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_POD),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/pods/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initPodPage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createPodEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_POD),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/pods', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initPodPage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initServiceAccountDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_POD_SERVICEACCOUNT_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/serviceaccounts', method: 'GET' });
        }),
        map((payload) => {
            return fillPodServiceAccountDropdownList(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initPodEpic, switchPodEpic, deletePodEpic, createPodEpic, initServiceAccountDropdownListEpic];