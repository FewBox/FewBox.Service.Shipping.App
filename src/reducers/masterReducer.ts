import ActionTypes from '../actions/ActionTypes';
import { MasterPage } from './State';
import { MessageType } from '@fewbox/react-components';

const master = { messageType: MessageType.Info, messageIntlId: '', isMessageVisible: false, isLoadingVisible: false, isDrawerVisible: false, namespaces: [], drawer: { type: '' } };
export default (state: MasterPage = master, action: any): MasterPage => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return { ...state, isLoadingVisible: true };
        case ActionTypes.END_LOADING:
            return { ...state, isLoadingVisible: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isMessageVisible: true, messageType: action.value.type, messageIntlId: action.value.intlId, messageValues: action.value.values };
        case ActionTypes.HIDE_MESSAGE:
            return { ...state, isMessageVisible: false };
        case ActionTypes.SHOW_DRAWER:
            return { ...state, isDrawerVisible: true, drawer: action.value };
        case ActionTypes.HIDE_DRAWER:
            return { ...state, isDrawerVisible: false };
        case ActionTypes.REDIRECT:
            return { ...state, path: action.value };
        case ActionTypes.CLEAR_PATH:
            return { ...state, path: undefined };
        case ActionTypes.FILL_NAMESPACE_DROPDOWNLIST:
            return { ...state, namespaces: action.payload };
        default:
            return state;
    }
}