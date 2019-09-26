import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadDeployment, initDeploymentPage, fillDeploymentServiceAccountDropdownList, fillDeploymentSecretDropdownList } from '../actions';

const initDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENTPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/deployments/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/deployments', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadDeployment(payload);
        })
    );

const switchDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/deployments/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/deployments', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadDeployment(payload);
        })
    );
const changeContainerShipNumberingEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_CONTAINERSHIPNUMBERING),
        mergeMap((action) => {
            let operations = action.value.cargos.map((cargo, index) => {
                return { "op": "replace", "path": "/spec/template/spec/containers/" + index + "/image", "value": cargo };
            });
            return AjaxObservable({ path: '/api/deployments/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: operations });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDeploymentPage();
        })
    );

const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/deployments/oncontainer', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDeploymentPage();
        })
    );

const scaleContainerShipQuantityEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCALE_CONTAINERSHIPQUANTITY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/deployments/merge/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: { spec: { replicas: action.value.quantity } } });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDeploymentPage();
        })
    );

const scrapContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCRAP_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/deployments/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initDeploymentPage();
        })
    );
const initServiceAccountDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/serviceaccounts', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillDeploymentServiceAccountDropdownList(payload);
        })
    );
const initSecretDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_SECRET_DROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/secrets', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillDeploymentSecretDropdownList(payload);
        })
    );

export default [initDeploymentEpic, switchDeploymentEpic, changeContainerShipNumberingEpic, constructContainerShipEpic, scaleContainerShipQuantityEpic, scrapContainerShipEpic, initServiceAccountDropdownListEpic, initSecretDropdownListEpic];