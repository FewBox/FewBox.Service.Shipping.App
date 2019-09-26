import { join } from "path";

const ActionTypes = {
    // Common
    REDIRECT: 'REDIRECT',
    CLEAR_PATH: 'CLEAR_PATH',
    SET_VALIDSTATUS: 'SET_VALIDSTATUS',
    CANCEL: 'CANCEL',
    // Auth
    SIGNIN: 'SIGNIN',
    SIGNOUT: 'SIGNOUT',
    // Setting
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    // Biz
    INIT_LANDINGPAGE: 'INIT_LANDINGPAGE',
    LOAD_LANDING: 'LOAD_LANDING',
    INIT_NAMESPACEPAGE: 'INIT_NAMESPACEPAGE',
    LOAD_NAMESPACE: 'LOAD_NAMESPACE',
    CREATE_NAMESPACE: 'CREATE_NAMESPACE',
    DELETE_NAMESPACE: 'DELETE_NAMESPACE',
    ENABLE_ISTIO: 'ENABLE_ISTIO',
    DISABLE_ISTIO: 'DISABLE_ISTIO',
    ENABLE_ISTIOSTATUS: 'ENABLE_ISTIOSTATUS',
    DISABLE_ISTIOSTATUS: 'DISABLE_ISTIOSTATUS',
    INIT_CONTAINERSHIPPAGE: 'INIT_CONTAINERSHIPPAGE',
    LOAD_CONTAINERSHIP: 'LOAD_CONTAINERSHIP',
    INIT_DEPLOYMENTPAGE: 'INIT_DEPLOYMENTPAGE',
    LOAD_DEPLOYMENT: 'LOAD_DEPLOYMENT',
    SWITCH_FEWBOXDELIVERY: 'SWITCH_FEWBOXDELIVERY',
    SWITCH_HELP: 'SWITCH_HELP',
    CONSTRUCT_CONTAINERSHIP: 'CONSTRUCT_CONTAINERSHIP',
    BUILD_TEMPORARYCONTAINERSHIP: 'BUILD_TEMPORARYCONTAINERSHIP',
    SCRAP_CONTAINERSHIP: 'SCRAP_CONTAINERSHIP',
    CHANGE_CONTAINERSHIPNUMBERING: 'CHANGE_CONTAINERSHIPNUMBERING',
    SCALE_CONTAINERSHIPQUANTITY: 'SCALE_CONTAINERSHIPQUANTITY',
    SINK_CONTAINERSHIP: 'SINK_CONTAINERSHIP',
    INIT_SERVICEPAGE: 'INIT_SERVICEPAGE',
    LOAD_SERVICE: 'LOAD_SERVICE',
    CREATE_SERVICE: 'CREATE_SERVICE',
    DELETE_SERVICE: 'DELETE_SERVICE',
    INIT_YARDAREAPAGE: 'INIT_YARDAREAPAGE',
    LOAD_YARDAREA: 'LOAD_YARDAREA',
    CONSTRUCT_YARDAREA: 'CONSTRUCT_YARDAREA',
    DEMOLISH_YARDAREA: 'DEMOLISH_YARDAREA',
    INIT_GATEAREAPAGE: 'INIT_GATEAREAPAGE',
    LOAD_GATEAREA: 'LOAD_GATEAREA',
    CONSTRUCT_GATEAREA: 'CONSTRUCT_GATEAREA',
    DEMOLISH_GATEAREA: 'DEMOLISH_GATEAREA',
    INIT_LOGBOOK: 'INIT_LOGBOOK',
    LOAD_LOGBOOK: 'LOAD_LOGBOOK',
    INIT_NODEPAGE: 'INIT_NODEPAGE',
    LOAD_NODE: 'LOAD_NODE',
    INIT_SERVICEACCOUNTPAGE: 'INIT_SERVICEACCOUNTPAGE',
    LOAD_SERVICEACCOUNT: 'LOAD_SERVICEACCOUNT',
    CREATE_SERVICEACCOUNT: 'CREATE_SERVICEACCOUNT',
    DELETE_SERVICEACCOUNT: 'DELETE_SERVICEACCOUNT',
    INIT_SECRETPAGE: 'INIT_SECRETPAGE',
    LOAD_SECRET: 'LOAD_SECRET',
    CREATE_SECRET: 'CREATE_SECRET',
    DELETE_SECRET: 'DELETE_SECRET',
    INIT_DESTINATIONRULEPAGE: 'INIT_DESTINATIONRULEPAGE',
    LOAD_DESTINATIONRULE: 'LOAD_DESTINATIONRULE',
    CREATE_DESTINATIONRULE: 'CREATE_DESTINATIONRULE',
    DELETE_DESTINATIONRULE: 'DELETE_DESTINATIONRULE',
    CHANGE_DESTINATIONRULESUBSET: 'CHANGE_DESTINATIONRULESUBSET',
    INIT_FREETRADEAREAPAGE: 'INIT_FREETRADEAREAPAGE',
    LOAD_FREETRADEAREA: 'LOAD_FREETRADEAREA',
    CONSTRUCT_FREETRADEAREA: 'CONSTRUCT_FREETRADEAREA',
    DEMOLISH_FREETRADEAREA: 'DEMOLISH_FREETRADEAREA',
    INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST: 'INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST',
    FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST: 'FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST',
    // UI
    BEGIN_LOADING: 'BEGIN_LOADING',
    END_LOADING: 'END_LOADING',
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE',
    INIT_NAMESPACEDROPDOWNLIST: 'INIT_NAMESPACEDROPDOWNLIST',
    FILL_NAMESPACEDROPDOWNLIST: 'FILL_NAMESPACEDROPDOWNLIST',
    INIT_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST: 'INIT_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST',
    FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST: 'FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST',
    INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST: 'INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST',
    FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST: 'FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST',
    INIT_DEPLOYMENT_SECRET_DROPDOWNLIST: 'INIT_DEPLOYMENT_SECRET_DROPDOWNLIST',
    FILL_DEPLOYMENT_SECRET_DROPDOWNLIST: 'FILL_DEPLOYMENT_SECRET_DROPDOWNLIST',
    INIT_YARDAREAGATEAREADROPDOWNLIST: 'INIT_YARDAREAGATEAREADROPDOWNLIST',
    FILL_YARDAREAGATEAREADROPDOWNLIST: 'FILL_YARDAREAGATEAREADROPDOWNLIST',
    INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST: 'INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST',
    FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST: 'FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST',
    SELECT_DESTINATIONRULE: 'SELECT_DESTINATIONRULE',
    FILL_SELECTEDDESTINATIONRULE: 'FILL_SELECTEDDESTINATIONRULE',
    INIT_YARDAREASERVICEDROPDOWNLIST: 'INIT_YARDAREASERVICEDROPDOWNLIST',
    FILL_YARDAREASERVICEDROPDOWNLIST: 'FILL_YARDAREASERVICEDROPDOWNLIST',
    INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST: 'INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST',
    FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST: 'FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST',
    SHOW_DRAWER: 'SHOW_DRAWER',
    HIDE_DRAWER: 'HIDE_DRAWER'
}
export default ActionTypes;