import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { MasterPage } from './State';
import { MessageType } from 'fewbox-react-components';

const master = { isMessageVisiable: false, messageType: MessageType.Loading };
export default (state: MasterPage = master, action: IAction<any>): MasterPage => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return { ...state, isMessageVisiable: true, messageType: MessageType.Loading, messageIntlId: 'Message.Loading' };
        case ActionTypes.END_LOADING:
            return { ...state, isMessageVisiable: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isMessageVisiable: true, messageContent: action.value };
        case ActionTypes.HIDE_MESSAGE:
            return { ...state, isMessageVisiable: false };
        case ActionTypes.REDIRECT:
            return { ...state, path: action.value };
        case ActionTypes.CLEAR_PATH:
            return { ...state, path: undefined };
        default:
            return state;
    }
}