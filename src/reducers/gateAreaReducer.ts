import ActionTypes from '../actions/ActionTypes';
import { GateAreaPage } from './State';

const gateAreaState = {
    gateAreas: [],
    channelComponents: []
};
export default (state: GateAreaPage = gateAreaState, action: any): GateAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_GATEAREA:
            return { ...state, gateAreas: action.payload };
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