import ActionTypes from '../actions/ActionTypes';
import { ContainerShipPage } from './State';

const containerShipState = {
    containerShips: [],
    serviceAccounts: []
};
export default (state: ContainerShipPage = containerShipState, action: any): ContainerShipPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTAINERSHIP:
            return { ...state, containerShips: action.payload };
        case ActionTypes.FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        default:
            return state;
    }
}