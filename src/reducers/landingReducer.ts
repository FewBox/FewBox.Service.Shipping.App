import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { LandingPage } from './State';

const landingState = {
    componentStatuses: [],
    apiVersions: { versions: [], serverAddressByClientCIDRs: [] },
    healthz: { content: '' },
    healthzAutoRegisterCompletion: { content: '' },
    healthzEtcd: { content: '' },
    healthzLog: { content: '' },
    healthzPing: { content: '' },
    healthzPoststarthook_ApiserviceOpenapiController: { content: '' },
    healthzPoststarthook_ApiserviceRegistrationController: { content: '' },
    healthzPoststarthook_ApiserviceStatusAvailableController: { content: '' },
    healthzPoststarthook_BootstrapController: { content: '' },
    healthzPoststarthook_CARegistration: { content: '' },
    healthzPoststarthook_GenericApiserverStartInformers: { content: '' },
    healthzPoststarthook_KubeApiserverAutoregistration: { content: '' },
    healthzPoststarthook_Rbac_BootstrapRoles: { content: '' },
    healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: { content: '' },
    healthzPoststarthook_StartApiextensionsControllers: { content: '' },
    healthzPoststarthook_StartApiextensionsInformers: { content: '' },
    healthzPoststarthook_StartKubeAggregatorInformers: { content: '' },
    healthzPoststarthook_StartKubeApiserverAdmissionInitializer: { content: '' },
    isDashboardLoading: false
};
export default (state: LandingPage = landingState, action: IPayloadAction<any>): LandingPage => {
    switch (action.type) {
        case ActionTypes.LOAD_LANDING:
            return { ...state, 
                componentStatuses: action.payload.componentStatuses,
                apiVersions: action.payload.apiVersions,
                healthz: action.payload.healthz,
                healthzAutoRegisterCompletion: action.payload.healthzAutoRegisterCompletion,
                healthzEtcd: action.payload.healthzEtcd,
                healthzLog: action.payload.healthzLog,
                healthzPing: action.payload.healthzPing,
                healthzPoststarthook_ApiserviceOpenapiController: action.payload.healthzPoststarthook_ApiserviceOpenapiController,
                healthzPoststarthook_ApiserviceRegistrationController: action.payload.healthzPoststarthook_ApiserviceRegistrationController,
                healthzPoststarthook_ApiserviceStatusAvailableController: action.payload.healthzPoststarthook_ApiserviceStatusAvailableController,
                healthzPoststarthook_BootstrapController: action.payload.healthzPoststarthook_BootstrapController,
                healthzPoststarthook_CARegistration: action.payload.healthzPoststarthook_CARegistration,
                healthzPoststarthook_GenericApiserverStartInformers: action.payload.healthzPoststarthook_GenericApiserverStartInformers,
                healthzPoststarthook_KubeApiserverAutoregistration: action.payload.healthzPoststarthook_KubeApiserverAutoregistration,
                healthzPoststarthook_Rbac_BootstrapRoles: action.payload.healthzPoststarthook_Rbac_BootstrapRoles,
                healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: action.payload.healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses,
                healthzPoststarthook_StartApiextensionsControllers: action.payload.healthzPoststarthook_StartApiextensionsControllers,
                healthzPoststarthook_StartApiextensionsInformers: action.payload.healthzPoststarthook_StartApiextensionsInformers,
                healthzPoststarthook_StartKubeAggregatorInformers: action.payload.healthzPoststarthook_StartKubeAggregatorInformers,
                healthzPoststarthook_StartKubeApiserverAdmissionInitializer: action.payload.healthzPoststarthook_StartKubeApiserverAdmissionInitializer
            };
        default:
            return state;
    }
}