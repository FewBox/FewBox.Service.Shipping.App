import ActionTypes from '../actions/ActionTypes';
import { CustomsPage } from './State';

const customState = {
    customs: [],
    berthComponents: []
};
export default (state: CustomsPage = customState, action: any): CustomsPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CUSTOMS:
            return { ...state, customs: action.payload };
            case ActionTypes.ADD_CUSTOMSBERTHCOMPONENT:
                let berthComponents = [...state.berthComponents, { name: 'berth' + action.value }];
                return { ...state, berthComponents: berthComponents };
            case ActionTypes.REMOVE_CUSTOMSBERTHCOMPONENT:
                let removedBerthComponents = [...state.berthComponents.slice(0, action.value), ...state.berthComponents.slice(action.value + 1)];
                return { ...state, berthComponents: removedBerthComponents };
        default:
            return state;
    }
}