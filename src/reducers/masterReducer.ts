import ActionTypes from '../actions/ActionTypes';
import { MasterPage } from './State';
import { MessageType } from '@fewbox/react-components';

const master = { messageType: MessageType.Info, messageIntlId: '', messageIsVisible: false, loadingIsVisible: false, shippingLines: [] };
export default (state: MasterPage = master, action: any): MasterPage => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return { ...state, loadingIsVisible: true };
        case ActionTypes.END_LOADING:
            return { ...state, loadingIsVisible: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, messageIsVisible: true, messageType: action.value.type, messageIntlId: action.value.intlId, messageValues: action.value.values };
        case ActionTypes.HIDE_MESSAGE:
            return { ...state, messageIsVisible: false };
        case ActionTypes.REDIRECT:
            return { ...state, path: action.value };
        case ActionTypes.CLEAR_PATH:
            return { ...state, path: undefined };
        case ActionTypes.FILL_SHIPPINGLINEDROPDOWNLIST:
            return { ...state, shippingLines: action.payload };
        default:
            return state;
    }
}