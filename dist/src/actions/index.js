import ActionTypes from './ActionTypes';
// Common
export var beginLoading = function () { return ({
    type: ActionTypes.BEGIN_LOADING
}); };
export var endLoading = function () { return ({
    type: ActionTypes.END_LOADING
}); };
export var showMessage = function (messageType, messageIntlId, messageValues) { return ({
    type: ActionTypes.SHOW_MESSAGE,
    value: { type: messageType, intlId: messageIntlId, values: messageValues }
}); };
export var hideMessage = function () { return ({
    type: ActionTypes.HIDE_MESSAGE
}); };
export var redirect = function (path) { return ({
    type: ActionTypes.REDIRECT,
    value: path
}); };
export var clearPath = function () { return ({
    type: ActionTypes.CLEAR_PATH
}); };
export var setValidStatus = function (isValid) { return ({
    type: ActionTypes.SET_VALIDSTATUS,
    value: isValid
}); };
export var empty = function (comment) { return ({
    type: ActionTypes.EMPTY,
    value: comment
}); };
// Auth
export var signIn = function (username, password) { return ({
    type: ActionTypes.SIGNIN,
    value: { username: username, password: password }
}); };
export var signOut = function () { return ({
    type: ActionTypes.SIGNOUT
}); };
// Setting
export var changeLanguage = function (lang) { return ({
    type: ActionTypes.CHANGE_LANGUAGE,
    value: lang
}); };
export var initLandingPage = function () { return ({
    type: ActionTypes.INIT_LANDINGPAGE
}); };
export var loadLandingPage = function (payload) { return ({
    type: ActionTypes.LOAD_LANDINGPAGE,
    payload: payload
}); };
export var initShippingLanePage = function () { return ({
    type: ActionTypes.INIT_SHIPPINGLANEPAGE
}); };
export var loadShippingLanePage = function (payload) { return ({
    type: ActionTypes.LOAD_SHIPPINGLANEPAGE,
    payload: payload
}); };
export var startShippingLane = function (shippingLane) { return ({
    type: ActionTypes.START_SHIPPINGLANE,
    value: shippingLane
}); };
export var closeShippingLane = function (shippingLaneName) { return ({
    type: ActionTypes.CLOSE_SHIPPINGLANE,
    value: shippingLaneName
}); };
export var enableIstio = function (shippingLaneName) { return ({
    type: ActionTypes.ENABLE_ISTIO,
    value: shippingLaneName
}); };
export var disableIstio = function (shippingLaneName) { return ({
    type: ActionTypes.DISABLE_ISTIO,
    value: shippingLaneName
}); };
//# sourceMappingURL=index.js.map