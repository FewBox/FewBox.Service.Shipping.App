import ActionTypes from '../actions/ActionTypes';
import { CustomsPage } from './State';

const customState = {
    customs: [],
    channelComponents: []
};
export default (state: CustomsPage = customState, action: any): CustomsPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CUSTOMS:
            return { ...state, customs: action.payload };
            case ActionTypes.ADD_CHANNELCOMPONENT:
                let channelComponents = [...state.channelComponents, { name: 'channel' + action.value }];
                return { ...state, channelComponents: channelComponents };
            case ActionTypes.REMOVE_CHANNELCOMPONENT:
                let removedChannelComponents = [...state.channelComponents.slice(0, action.value), ...state.channelComponents.slice(action.value + 1)];
                return { ...state, channelComponents: removedChannelComponents };
        default:
            return state;
    }
}