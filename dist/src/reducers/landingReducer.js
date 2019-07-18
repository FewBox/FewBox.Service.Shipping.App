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
var landingState = {
    contributors: []
};
export default (function (state, action) {
    if (state === void 0) { state = landingState; }
    switch (action.type) {
        case ActionTypes.LOAD_LANDINGPAGE:
            return __assign({}, state, { contributors: action.payload });
        default:
            return state;
    }
});
//# sourceMappingURL=landingReducer.js.map