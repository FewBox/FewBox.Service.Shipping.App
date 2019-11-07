import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { zip } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initVirtualServicePage, loadVirtualService, fillVirtualServiceGatewayDropdownList, fillVirtualServiceServiceDropdownList, fillVirtualServiceDeploymentDropdownList, fillSelectedVirtualServiceServiceDropdownList, fillSelectedVirtualServiceDeploymentDropdownList } from '../actions';

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
            return (new AjaxObservable({ path: '/api/deployments?labels=app=' + action.value, method: 'GET' }))
                .pipe(
                    map((payload) => {
                        debugger;
                        let deployments = { service: action.value, deployments: payload };
                        return fillVirtualServiceDeploymentDropdownList(deployments);
                    }));
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const selectVirtualServiceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SELECT_VIRTUALSERVICE),
        mergeMap((action) => {
            return zip(new AjaxObservable({ path: '/api/namespaces/' + action.value.namespace + '/services', method: 'GET' }),
                new AjaxObservable({ path: '/api/virtualservices/' + action.value.namespace + '/' + action.value.name, method: 'GET' }),
                new AjaxObservable({ path: '/api/namespaces/' + action.value.namespace + '/gateways', method: 'GET' }));
        }),
        map((payloads) => {
            return fillSelectedVirtualServiceServiceDropdownList({ allServices: payloads[0], https: payloads[1].https, hosts: payloads[1].hosts, gateways: payloads[1].gateways, allGateways: payloads[2] });
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initSelectedVirtualServiceDeploymentDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SELECTEDVIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            return fillSelectedVirtualServiceDeploymentDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const changeVirtualServiceHttpEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_VIRTUALSERVICE_HTTP),
        mergeMap((action) => {
            return new AjaxObservable({
                path: '/api/virtualservices/' + action.value.namespace + '/' + action.value.name, method: 'PATCH',
                body: [
                    { "op": "replace", "path": "/spec/http", "value": action.value.https },
                    { "op": "replace", "path": "/spec/hosts", "value": action.value.hosts },
                    { "op": "replace", "path": "/spec/gateways", "value": action.value.gateways }
                ]
            });
        }),
        map((payload) => {
            return initVirtualServicePage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initVirtualServicePageEpic, createVirtualServicePageEpic, switchVirtualServiceEpic, deleteVirtualServicePageEpic, initGatewayDropdownListEpic, initServiceDropdownListEpic, initDeploymentDropdownListEpic, selectVirtualServiceEpic, initSelectedVirtualServiceDeploymentDropdownListEpic, changeVirtualServiceHttpEpic];