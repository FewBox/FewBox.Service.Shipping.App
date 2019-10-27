import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { zip } from "rxjs";
import { switchMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadLanding} from '../actions';

const initLandingPageEric = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LANDING_PAGE),
        switchMap(() => {
            return zip(new AjaxObservable({ path: '/api/componentstatuses', method: 'GET' }),
            new AjaxObservable({ path: '/api/apiversions', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_autoregistercompletion', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_etcd', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_log', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_ping', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/apiservice-openapi-controller', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/apiservice-registration-controller', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/apiservice-status-available-controller', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/bootstrap-controller', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/ca-registration', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/generic-apiserver-start-informers', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/kube-apiserver-autoregistration', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/rbac/bootstrap-roles', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/rbacscheduling/bootstrap-system-priority-classes', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/start-apiextensions-controllers', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/start-apiextensions-informers', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/start-kube-aggregator-informers', method: 'GET' }),
            new AjaxObservable({ path: '/api/healthz_poststarthook/start-kube-apiserver-admission-initializer', method: 'GET' }));
        }),
        map((payloads) => {
            return loadLanding({ 
                componentStatuses: payloads[0],
                apiVersions: payloads[1],
                healthz: payloads[2],
                healthzAutoRegisterCompletion: payloads[3],
                healthzEtcd: payloads[4],
                healthzLog: payloads[5],
                healthzPing: payloads[6],
                healthzPoststarthook_ApiserviceOpenapiController: payloads[7],
                healthzPoststarthook_ApiserviceRegistrationController: payloads[8],
                healthzPoststarthook_ApiserviceStatusAvailableController: payloads[9],
                healthzPoststarthook_BootstrapController: payloads[10],
                healthzPoststarthook_CARegistration: payloads[11],
                healthzPoststarthook_GenericApiserverStartInformers: payloads[12],
                healthzPoststarthook_KubeApiserverAutoregistration: payloads[13],
                healthzPoststarthook_Rbac_BootstrapRoles: payloads[14],
                healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: payloads[15],
                healthzPoststarthook_StartApiextensionsControllers: payloads[16],
                healthzPoststarthook_StartApiextensionsInformers: payloads[17],
                healthzPoststarthook_StartKubeAggregatorInformers: payloads[18],
                healthzPoststarthook_StartKubeApiserverAdmissionInitializer: payloads[19]
            });
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initLandingPageEric];