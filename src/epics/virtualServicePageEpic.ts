import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initVirtualServicePage, loadVirtualService, fillVirtualServiceGatewayDropdownList, fillVirtualServiceServiceDropdownList, fillVirtualServiceDeploymentDropdownList } from '../actions';

const initVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/virtualservices/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/virtualservices', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadVirtualService(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const switchVirtualServiceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/virtualservices/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/virtualservices', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadVirtualService(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_VIRTUALSERVICE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/virtualservices', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initVirtualServicePage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_VIRTUALSERVICE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/virtualservices/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initVirtualServicePage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initGatewayDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/gateways', method: 'GET' });
        }),
        map((payload) => {
            return fillVirtualServiceGatewayDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initServiceDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_SERVICE_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/services', method: 'GET' });
        }),
        map((payload) => {
            return fillVirtualServiceServiceDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initDeploymentDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            return fillVirtualServiceDeploymentDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initVirtualServicePageEpic, createVirtualServicePageEpic, switchVirtualServiceEpic, deleteVirtualServicePageEpic, initGatewayDropdownListEpic, initServiceDropdownListEpic, initDeploymentDropdownListEpic];