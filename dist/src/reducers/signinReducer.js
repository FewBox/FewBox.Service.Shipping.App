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
var signInState = {
    isUsernameAndPasswordValid: true
};
export default (function (state, action) {
    if (state === void 0) { state = signInState; }
    switch (action.type) {
        case ActionTypes.SET_VALIDSTATUS:
            return __assign({}, state, { isUsernameAndPasswordValid: action.value });
        default:
            return state;
    }
});
//# sourceMappingURL=signinReducer.js.map