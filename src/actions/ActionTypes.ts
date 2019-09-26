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
    INIT_LANDING_PAGE: 'INIT_LANDING_PAGE',
    LOAD_LANDING: 'LOAD_LANDING',
    INIT_NAMESPACE_PAGE: 'INIT_NAMESPACE_PAGE',
    LOAD_NAMESPACE: 'LOAD_NAMESPACE',
    CREATE_NAMESPACE: 'CREATE_NAMESPACE',
    DELETE_NAMESPACE: 'DELETE_NAMESPACE',
    ENABLE_ISTIO: 'ENABLE_ISTIO',
    DISABLE_ISTIO: 'DISABLE_ISTIO',
    ENABLE_ISTIOSTATUS: 'ENABLE_ISTIOSTATUS',
    DISABLE_ISTIOSTATUS: 'DISABLE_ISTIOSTATUS',
    INIT_POD_PAGE: 'INIT_POD_PAGE',
    LOAD_POD: 'LOAD_POD',
    INIT_DEPLOYMENT_PAGE: 'INIT_DEPLOYMENT_PAGE',
    LOAD_DEPLOYMENT: 'LOAD_DEPLOYMENT',
    SWITCH_FEWBOXDELIVERY: 'SWITCH_FEWBOXDELIVERY',
    SWITCH_HELP: 'SWITCH_HELP',
    CREATE_DEPLOYMENT: 'CREATE_DEPLOYMENT',
    DELETE_DEPLOYMENT: 'DELETE_DEPLOYMENT',
    CREATE_POD: 'CREATE_POD',
    CHANGE_POD_VERSION: 'CHANGE_POD_VERSION',
    SCALE_POD_REPLICAS: 'SCALE_POD_REPLICAS',
    DELETE_POD: 'DELETE_POD',
    INIT_SERVICE_PAGE: 'INIT_SERVICE_PAGE',
    LOAD_SERVICE: 'LOAD_SERVICE',
    CREATE_SERVICE: 'CREATE_SERVICE',
    DELETE_SERVICE: 'DELETE_SERVICE',
    INIT_VIRTUALSERVICE_PAGE: 'INIT_VIRTUALSERVICE_PAGE',
    LOAD_VIRTUALSERVICE: 'LOAD_VIRTUALSERVICE',
    CREATE_VIRTUALSERVICE: 'CREATE_VIRTUALSERVICE',
    DELETE_VIRTUALSERVICE: 'VIRTUALSERVICE',
    INIT_GATEWAY_PAGE: 'INIT_GATEWAY_PAGE',
    LOAD_GATEWAY: 'LOAD_GATEWAY',
    CREATE_GATEWAY: 'CREATE_GATEWAY',
    DELETE_GATEWAY: 'DELETE_GATEWAY',
    INIT_LOGBOOK: 'INIT_LOGBOOK',
    LOAD_LOGBOOK: 'LOAD_LOGBOOK',
    INIT_NODEPAGE: 'INIT_NODEPAGE',
    LOAD_NODE: 'LOAD_NODE',
    INIT_SERVICEACCOUNT_PAGE: 'INIT_SERVICEACCOUNT_PAGE',
    LOAD_SERVICEACCOUNT: 'LOAD_SERVICEACCOUNT',
    CREATE_SERVICEACCOUNT: 'CREATE_SERVICEACCOUNT',
    DELETE_SERVICEACCOUNT: 'DELETE_SERVICEACCOUNT',
    INIT_SECRET_PAGE: 'INIT_SECRET_PAGE',
    LOAD_SECRET: 'LOAD_SECRET',
    CREATE_SECRET: 'CREATE_SECRET',
    DELETE_SECRET: 'DELETE_SECRET',
    INIT_DESTINATIONRULE_PAGE: 'INIT_DESTINATIONRULE_PAGE',
    LOAD_DESTINATIONRULE: 'LOAD_DESTINATIONRULE',
    CREATE_DESTINATIONRULE: 'CREATE_DESTINATIONRULE',
    DELETE_DESTINATIONRULE: 'DELETE_DESTINATIONRULE',
    CHANGE_DESTINATIONRULE_SUBSET: 'CHANGE_DESTINATIONRULE_SUBSET',
    INIT_SERVICEENTRY_PAGE: 'INIT_SERVICEENTRY_PAGE',
    LOAD_SERVICEENTRY: 'LOAD_SERVICEENTRY',
    CREATE_SERVICEENTRY: 'CREATE_SERVICEENTRY',
    DELETE_SERVICEENTRY: 'SERVICEENTRY',
    INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST: 'INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST',
    FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST: 'FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST',
    // UI
    BEGIN_LOADING: 'BEGIN_LOADING',
    END_LOADING: 'END_LOADING',
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE',
    INIT_NAMESPACE_DROPDOWNLIST: 'INIT_NAMESPACE_DROPDOWNLIST',
    FILL_NAMESPACE_DROPDOWNLIST: 'FILL_NAMESPACE_DROPDOWNLIST',
    INIT_POD_SERVICEACCOUNT_DROPDOWNLIST: 'INIT_POD_SERVICEACCOUNT_DROPDOWNLIST',
    FILL_POD_SERVICEACCOUNT_DROPDOWNLIST: 'FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST',
    INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST: 'INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST',
    FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST: 'FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST',
    INIT_DEPLOYMENT_SECRET_DROPDOWNLIST: 'INIT_DEPLOYMENT_SECRET_DROPDOWNLIST',
    FILL_DEPLOYMENT_SECRET_DROPDOWNLIST: 'FILL_DEPLOYMENT_SECRET_DROPDOWNLIST',
    INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST: 'INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST',
    FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST: 'FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST',
    INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST: 'INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST',
    FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST: 'FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST',
    SELECT_DESTINATIONRULE: 'SELECT_DESTINATIONRULE',
    FILL_SELECTED_DESTINATIONRULE: 'FILL_SELECTED_DESTINATIONRULE',
    INIT_VIRTUALSERVICE_SERVICE_DROPDOWNLIST: 'INIT_VIRTUALSERVICE_SERVICE_DROPDOWNLIST',
    FILL_VIRTUALSERVICE_SERVICE_DROPDOWNLIST: 'FILL_YARDAREASERVICEDROPDOWNLIST',
    INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST: 'INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST',
    FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST: 'FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST',
    SHOW_DRAWER: 'SHOW_DRAWER',
    HIDE_DRAWER: 'HIDE_DRAWER'
}
export default ActionTypes;