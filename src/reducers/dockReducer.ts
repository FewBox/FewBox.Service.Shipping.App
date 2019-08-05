import ActionTypes from '../actions/ActionTypes';
import { DockPage } from './State';

const dockState = {
    docks: [],
    mooringComponents: []
};
export default (state: DockPage = dockState, action: any): DockPage => {
    switch (action.type) {
        case ActionTypes.LOAD_DOCK:
            return { ...state, docks: action.payload };
        case ActionTypes.ADD_MOORINGCOMPONENT:
            let mooringComponents = [...state.mooringComponents, { name: 'mooring' + action.value }];
            return { ...state, mooringComponents: mooringComponents };
        case ActionTypes.REMOVE_MOORINGCOMPONENT:
            let removedMooringComponents = [...state.mooringComponents.slice(0, action.value), ...state.mooringComponents.slice(action.value + 1)];
            return { ...state, mooringComponents: removedMooringComponents };
        default:
            return state;
    }
}