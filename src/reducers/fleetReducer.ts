import ActionTypes from '../actions/ActionTypes';
import { FleetPage } from './State';

const fleetState = {
    fleets: [],
    ownerShipItemComponents: []
};
export default (state: FleetPage = fleetState, action: any): FleetPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPPINGLINE:
            return { ...state, fleets: action.payload };
        case ActionTypes.ADD_OWNERSHIPITEMCOMPONENT:
            let ownerShipItemComponents = [...state.ownerShipItemComponents, { name: 'ownership' + action.value }];
            return { ...state, ownerShipItemComponents: ownerShipItemComponents };
        case ActionTypes.REMOVE_OWNERSHIPITEMCOMPONENT:
            let removedOwnerShipItemComponents = [...state.ownerShipItemComponents.slice(0, action.value), ...state.ownerShipItemComponents.slice(action.value + 1)];
            return { ...state, ownerShipItemComponents: removedOwnerShipItemComponents };
        default:
            return state;
    }
}