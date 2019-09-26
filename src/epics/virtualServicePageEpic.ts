import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initVirtualServicePage, loadVirtualService, fillVirtualServiceGatewayDropdownList, fillVirtualServiceServiceDropdownList, fillVirtualServiceDeploymentDropdownList } from '../actions';

const initYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/yardareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/yardareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadVirtualService(payload);
        })
    );
const switchYardAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/yardareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/yardareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadVirtualService(payload);
        })
    );
const constructYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_VIRTUALSERVICE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initVirtualServicePage();
        })
    );
const demolishYardAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_VIRTUALSERVICE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/yardareas/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initVirtualServicePage();
        })
    );
const initGateAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/gateareas', method: 'GET' });
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

export default [initYardAreaPageEpic, constructYardAreaPageEpic, switchYardAreaEpic, demolishYardAreaPageEpic, initGateAreaDropdownListEpic, initServiceDropdownListEpic, initDeploymentDropdownListEpic];