import ActionTypes from '../actions/ActionTypes';
import { ShipyardPage } from './State';

const shipyardState = {
    shipyards: [],
    shippingLines: []
};
export default (state: ShipyardPage = shipyardState, action: any): ShipyardPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPYARD:
            return { ...state, shipyards: action.payload };
        case ActionTypes.FILL_SHIPPINGLINEDROPDOWNLIST:
            return { ...state, shippingLines: action.payload };
        default:
            return state;
    }
}