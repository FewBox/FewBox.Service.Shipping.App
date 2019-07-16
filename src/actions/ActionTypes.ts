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
    LOAD_LANDINGPAGE: 'LOAD_LANDINGPAGE',
    // Biz
    INIT_SHIPPINGLANEPAGE: 'INIT_SHIPPINGLANEPAGE',
    LOAD_SHIPPINGLANEPAGE: 'LOAD_SHIPPINGLANEPAGE',
    START_SHIPPINGLANE: 'START_SHIPPINGLANE',
    CLOSE_SHIPPINGLANE: 'CLOSE_SHIPPINGLANE',
    ENABLE_ISTIO: 'ENABLE_ISTIO',
    DISABLE_ISTIO: 'DISABLE_ISTIO'
}
export default ActionTypes;