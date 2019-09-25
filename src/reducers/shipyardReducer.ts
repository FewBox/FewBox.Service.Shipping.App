import ActionTypes from '../actions/ActionTypes';
import { ShipyardPage } from './State';

const shipyardState = {
    shipyards: [],
    serviceAccounts: [],
    credentials: []
};
export default (state: ShipyardPage = shipyardState, action: any): ShipyardPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPYARD:
            return { ...state, shipyards: action.payload };
        case ActionTypes.FILL_SHIPYARDSERVICEACCOUNTDROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        case ActionTypes.FILL_SHIPYARDCREDENTIALDROPDOWNLIST:
            return { ...state, credentials: action.payload };
        default:
            return state;
    }
}