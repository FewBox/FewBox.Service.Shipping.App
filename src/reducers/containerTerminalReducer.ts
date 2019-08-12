import ActionTypes from '../actions/ActionTypes';
import { ContainerTerminalPage } from './State';

const containerTerminalState = {
    containerTerminals: [],
    berthComponents: []
};
export default (state: ContainerTerminalPage = containerTerminalState, action: any): ContainerTerminalPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTAINERTERMINAL:
            return { ...state, containerTerminals: action.payload };
        case ActionTypes.ADD_BERTHCOMPONENT:
            let berthComponents = [...state.berthComponents, { name: 'berth' + action.value }];
            return { ...state, berthComponents: berthComponents };
        case ActionTypes.REMOVE_BERTHCOMPONENT:
            let removedBerthComponents = [...state.berthComponents.slice(0, action.value), ...state.berthComponents.slice(action.value + 1)];
            return { ...state, berthComponents: removedBerthComponents };
        default:
            return state;
    }
}