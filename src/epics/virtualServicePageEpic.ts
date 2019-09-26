import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initVirtualServicePage, loadVirtualService, fillVirtualServiceGatewayDropdownList, fillVirtualServiceServiceDropdownList, fillVirtualServiceDeploymentDropdownList } from '../actions';

const initVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/virtualservices/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/virtualservices', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadVirtualService(payload);
        })
    );
const switchVirtualServiceEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/virtualservices/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/virtualservices', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadVirtualService(payload);
        })
    );
const createVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_VIRTUALSERVICE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/virtualservices', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initVirtualServicePage();
        })
    );
const deleteVirtualServicePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_VIRTUALSERVICE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/virtualservices/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initVirtualServicePage();
        })
    );
const initGatewayDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/gatewaies', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillVirtualServiceGatewayDropdownList(payload);
        })
    );
const initServiceDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_SERVICE_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/services', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillVirtualServiceServiceDropdownList(payload);
        })
    );
const initDeploymentDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/deployments?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillVirtualServiceDeploymentDropdownList(payload);
        })
    );

export default [initVirtualServicePageEpic, createVirtualServicePageEpic, switchVirtualServiceEpic, deleteVirtualServicePageEpic, initGatewayDropdownListEpic, initServiceDropdownListEpic, initDeploymentDropdownListEpic];