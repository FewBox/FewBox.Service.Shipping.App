import ActionTypes from '../actions/ActionTypes';
import { QuayAreaPage } from './State';

const quaryAreaState = {
    quayAreas: [],
    berthComponents: []
};
export default (state: QuayAreaPage = quaryAreaState, action: any): QuayAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_QUAYAREA:
            return { ...state, quayAreas: action.payload };
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