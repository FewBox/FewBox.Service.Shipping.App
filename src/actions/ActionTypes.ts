const ActionTypes = {
    // Common
    BEGIN_LOADING: 'BEGIN_LOADING',
    END_LOADING: 'END_LOADING',
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE',
    REDIRECT: 'REDIRECT',
    CLEAR_PATH: 'CLEAR_PATH',
    SET_VALIDSTATUS: 'SET_VALIDSTATUS',
    EMPTY: 'EMPTY',
    CANCEL: 'CANCEL',
    // Auth
    SIGNIN: 'SIGNIN',
    SIGNOUT: 'SIGNOUT',
    // Setting
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    INIT_LANDINGPAGE: 'INIT_LANDINGPAGE',
    LOAD_LANDING: 'LOAD_LANDING',
    // Biz
    INIT_SHIPPINGLINEPAGE: 'INIT_SHIPPINGLINEPAGE',
    LOAD_SHIPPINGLINE: 'LOAD_SHIPPINGLINE',
    START_SHIPPINGLINE: 'START_SHIPPINGLINE',
    CLOSE_SHIPPINGLINE: 'CLOSE_SHIPPINGLINE',
    ENABLE_ISTIO: 'ENABLE_ISTIO',
    DISABLE_ISTIO: 'DISABLE_ISTIO',
    ENABLE_ISTIOSTATUS: 'ENABLE_ISTIOSTATUS',
    DISABLE_ISTIOSTATUS: 'DISABLE_ISTIOSTATUS',
    INIT_CONTAINERSHIPPAGE: 'INIT_CONTAINERSHIPPAGE',
    LOAD_CONTAINERSHIP: 'LOAD_CONTAINERSHIP',
    INIT_SHIPYARDPAGE: 'INIT_SHIPYARDPAGE',
    LOAD_SHIPYARD: 'LOAD_SHIPYARD',
    SWITCH_FEWBOXDELIVERY: 'SWITCH_FEWBOXDELIVERY',
    CONSTRUCT_CONTAINERSHIP: 'CONSTRUCT_CONTAINERSHIP',
    SCRAP_CONTAINERSHIP: 'SCRAP_CONTAINERSHIP',
    SCALE_CONTAINERSHIPQUANTITY: 'SCALE_CONTAINERSHIPQUANTITY',
    SINK_CONTAINERSHIP: 'SINK_CONTAINERSHIP',
    INIT_FLEETPAGE: 'INIT_FLEETPAGE',
    LOAD_FLEET: 'LOAD_FLEET',
    SETUP_FLEET: 'SETUP_FLEET',
    DISSOLVE_FLEET: 'DISSOLVE_FLEET',
    INIT_CUSTOMPAGE: 'INIT_CUSTOMPAGE',
    LOAD_CUSTOM: 'LOAD_CUSTOM',
    // UI
    ADD_OWNERSHIPITEMCOMPONENT: 'ADD_OWNERSHIPITEMCOMPONENT',
    REMOVE_OWNERSHIPITEMCOMPONENT: 'REMOVE_OWNERSHIPITEMCOMPONENT',
    INIT_SHIPPINGLINEDROPDOWNLIST: 'INIT_SHIPPINGLINEDROPDOWNLIST',
    FILL_SHIPPINGLINEDROPDOWNLIST: 'FILL_SHIPPINGLINEDROPDOWNLIST'
}
export default ActionTypes;