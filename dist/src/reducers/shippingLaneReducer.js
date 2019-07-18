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
var shippingLaneState = {
    shippingLanes: []
};
export default (function (state, action) {
    if (state === void 0) { state = shippingLaneState; }
    switch (action.type) {
        case ActionTypes.LOAD_SHIPPINGLANEPAGE:
            return __assign({}, state, { shippingLanes: action.payload });
        default:
            return state;
    }
});
//# sourceMappingURL=shippingLaneReducer.js.map