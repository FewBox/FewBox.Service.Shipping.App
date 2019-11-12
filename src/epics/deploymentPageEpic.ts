import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError, retry } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadDeployment, initDeploymentPage, fillDeploymentServiceAccountDropdownList, fillDeploymentSecretDropdownList, endLoading, beginLoading, fillSelectedDeployment, fillSelfImageDropdownList, fillDeploymentSelfImageVersionDropdownList, fillDeploymentHubImageVersionDropdownList, fillHubImageDropdownList } from '../actions';

const initDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/deployments/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/deployments', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadDeployment(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const switchDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/deployments/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/deployments', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadDeployment(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const changeDeploymentVersionEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_DEPLOYMENT_VERSION),
        mergeMap((action) => {
            let operations = action.value.images.map((image, index) => {
                return { "op": "replace", "path": "/spec/template/spec/containers/" + index + "/image", "value": image };
            });
            return new AjaxObservable({ path: '/api/deployments/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: operations });
        }),
        map((payload) => {
            return initDeploymentPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const createDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_DEPLOYMENT),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments/oncontainer', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initDeploymentPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const scaleDeploymentReplicasEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SCALE_DEPLOYMENT_REPLICAS),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments/merge/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: { spec: { replicas: action.value.replicas } } });
        }),
        map((payload) => {
            return initDeploymentPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const deleteDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_DEPLOYMENT),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initDeploymentPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const selectDeploymentEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SELECT_DEPLOYMENT),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments/' + action.value.namespace + '/' + action.value.name, method: 'GET' });
        }),
        map((payload) => {
            let images = payload.containers.map((container, index) => {
                return container.image;
            });
            return fillSelectedDeployment({ images: images });
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initServiceAccountDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/serviceaccounts', method: 'GET' });
        }),
        map((payload) => {
            return fillDeploymentServiceAccountDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initSecretDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_SECRET_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/secrets', method: 'GET' });
        }),
        map((payload) => {
            return fillDeploymentSecretDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const initSelfImageDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SELFIMAGE_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/repositories', method: 'GET' });
        }),
        map((payload) => {
            return fillSelfImageDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const initHubImageDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_HUBIMAGE_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: `/api/hub/${action.value}`, method: 'GET' });
        }),
        retry(3),
        map((payload) => {
            return fillHubImageDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const initDeploymentSelfImageVersionDropdownList = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_SELFREGISTRY_IMAGEVERSION_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: `/api/repositories/${encodeURIComponent(action.value)}`, method: 'GET' });
        }),
        map((payload) => {
            return fillDeploymentSelfImageVersionDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const initDeploymentHubImageVersionDropdownList = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DEPLOYMENT_HUBREGISTRY_IMAGEVERSION_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: `/api/hub/${encodeURIComponent(action.value)}`, method: 'GET' });
        }),
        retry(3),
        map((payload) => {
            return fillDeploymentHubImageVersionDropdownList(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initDeploymentEpic, switchDeploymentEpic, changeDeploymentVersionEpic, createDeploymentEpic, scaleDeploymentReplicasEpic, deleteDeploymentEpic,
    selectDeploymentEpic, initServiceAccountDropdownListEpic, initSecretDropdownListEpic, initSelfImageDropdownListEpic, initDeploymentSelfImageVersionDropdownList,
    initHubImageDropdownListEpic, initDeploymentHubImageVersionDropdownList];