import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { ShippingLanePage, ShippingLane } from './State';

const shippingLaneState = {
    shippingLanes: []
};
export default (state: ShippingLanePage = shippingLaneState, action: IPayloadAction<ShippingLane[]>): ShippingLanePage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPPINGLANEPAGE:
            return { ...state, shippingLanes: action.payload };
        default:
            return state;
    }
}