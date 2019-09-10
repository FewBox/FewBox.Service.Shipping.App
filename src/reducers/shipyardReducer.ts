import ActionTypes from '../actions/ActionTypes';
import { ShipyardPage } from './State';

const shipyardState = {
    shipyards: [],
    captains: [],
    credentials: []
};
export default (state: ShipyardPage = shipyardState, action: any): ShipyardPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPYARD:
            return { ...state, shipyards: action.payload };
        case ActionTypes.FILL_CAPTAINDROPDOWNLIST:
            return { ...state, captains: action.payload };
        case ActionTypes.FILL_CREDENTIALDROPDOWNLIST:
            return { ...state, credentials: action.payload };
        default:
            return state;
    }
}