var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import ActionTypes from '../actions/ActionTypes';
var master = { messageType: 4 /* Loading */, messageIntlId: '', messageIsVisible: false };
export default (function (state, action) {
    if (state === void 0) { state = master; }
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return __assign({}, state, { messageIsVisible: true, messageType: 4 /* Loading */, messageIntlId: 'Message.Loading' });
        case ActionTypes.END_LOADING:
            return __assign({}, state, { messageIsVisible: false });
        case ActionTypes.SHOW_MESSAGE:
            return __assign({}, state, { messageIsVisible: true, messageType: action.value.type, messageIntlId: action.value.intlId, messageValues: action.value.values });
        case ActionTypes.REDIRECT:
            return __assign({}, state, { path: action.value });
        case ActionTypes.CLEAR_PATH:
            return __assign({}, state, { path: undefined });
        default:
            return state;
    }
});
//# sourceMappingURL=masterReducer.js.map