import ActionTypes from '../actions/ActionTypes';
import { MasterPage } from './State';
import { MessageType } from '@fewbox/react-components';

const master = { messageType: MessageType.Info, messageIntlId: '', isMessageVisible: false, isLoadingVisible: false, isDrawerVisible: false, isLockWindowVisible: false, namespaces: [], drawer: { type: '' } };
export default (state: MasterPage = master, action: any): MasterPage => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return { ...state, isLoadingVisible: true };
        case ActionTypes.END_LOADING:
            return { ...state, isLoadingVisible: false };
        case ActionTypes.SHOW_LOCKWINDOW:
            return { ...state, isLockWindowVisible: true };
        case ActionTypes.HIDE_LOCKWINDOW:
            return { ...state, isLockWindowVisible: false };
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
        case ActionTypes.FILL_IMAGE_DROPDOWNLIST:
            return { ...state, images: action.payload };
        case ActionTypes.FILL_DEPLOYMENT_IMAGEVERSION_DROPDOWNLIST:
            return { ...state, versions: action.payload };
        default:
            return state;
    }
}