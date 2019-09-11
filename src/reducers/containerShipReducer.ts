import ActionTypes from '../actions/ActionTypes';
import { ContainerShipPage } from './State';

const containerShipState = {
    containerShips: [],
    captains: []
};
export default (state: ContainerShipPage = containerShipState, action: any): ContainerShipPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTAINERSHIP:
            return { ...state, containerShips: action.payload };
        case ActionTypes.FILL_CAPTAINDROPDOWNLIST:
            return { ...state, captains: action.payload };
        default:
            return state;
    }
}