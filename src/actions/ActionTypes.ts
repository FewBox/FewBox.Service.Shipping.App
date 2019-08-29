const ActionTypes = {
    // Common
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
    // Biz
    INIT_LANDINGPAGE: 'INIT_LANDINGPAGE',
    LOAD_LANDING: 'LOAD_LANDING',
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
    BUILD_TEMPORARYCONTAINERSHIP: 'BUILD_TEMPORARYCONTAINERSHIP',
    SCRAP_CONTAINERSHIP: 'SCRAP_CONTAINERSHIP',
    SCALE_CONTAINERSHIPQUANTITY: 'SCALE_CONTAINERSHIPQUANTITY',
    SINK_CONTAINERSHIP: 'SINK_CONTAINERSHIP',
    INIT_QUAYAREAPAGE: 'INIT_QUAYAREAPAGE',
    LOAD_QUAYAREA: 'LOAD_QUAYAREA',
    CONSTRUCT_QUAYAREA: 'CONSTRUCT_QUAYAREA',
    DEMOLISH_QUAYAREA: 'DEMOLISH_QUAYAREA',
    INIT_GATEAREAPAGE: 'INIT_GATEAREAPAGE',
    LOAD_GATEAREA: 'LOAD_GATEAREA',
    CONSTRUCT_GATEAREA: 'CONSTRUCT_GATEAREA',
    DEMOLISH_GATEAREA: 'DEMOLISH_GATEAREA',
    INIT_LOGBOOK: 'INIT_LOGBOOK',
    LOAD_LOGBOOK: 'LOAD_LOGBOOK',
    INIT_COUNTRYPAGE: 'INIT_COUNTRYPAGE',
    LOAD_COUNTRY: 'LOAD_COUNTRY',
    INIT_CAPTAINPAGE: 'INIT_CAPTAINPAGE',
    LOAD_CAPTAIN: 'LOAD_CAPTAIN',
    TRAIN_CAPTAIN: 'TRAIN_CAPTAIN',
    FIRE_CAPTAIN: 'FIRE_CAPTAIN',
    INIT_CREDENTIALPAGE: 'INIT_CREDENTIALPAGE',
    LOAD_CREDENTIAL: 'LOAD_CREDENTIAL',
    ISSUE_CREDENTIAL: 'ISSUE_CREDENTIAL',
    REVOKE_CREDENTIAL: 'REVOKE_CREDENTIAL',
    // UI
    BEGIN_LOADING: 'BEGIN_LOADING',
    END_LOADING: 'END_LOADING',
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE',
    ADD_BERTHCOMPONENT: 'ADD_BERTHCOMPONENT',
    REMOVE_BERTHCOMPONENT: 'REMOVE_BERTHCOMPONENT',
    ADD_CHANNELCOMPONENT: 'ADD_CHANNELCOMPONENT',
    REMOVE_CHANNELCOMPONENT: 'REMOVE_CHANNELCOMPONENT',
    INIT_SHIPPINGLINEDROPDOWNLIST: 'INIT_SHIPPINGLINEDROPDOWNLIST',
    FILL_SHIPPINGLINEDROPDOWNLIST: 'FILL_SHIPPINGLINEDROPDOWNLIST',
    SHOW_DRAWER: 'SHOW_DRAWER',
    HIDE_DRAWER: 'HIDE_DRAWER'
}
export default ActionTypes;