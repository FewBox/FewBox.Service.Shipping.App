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
var settingState = { lang: 'en-us' };
export default (function (state, action) {
    if (state === void 0) { state = settingState; }
    switch (action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            return __assign({}, state, { lang: action.payload });
        default:
            return state;
    }
});
//# sourceMappingURL=settingReducer.js.map