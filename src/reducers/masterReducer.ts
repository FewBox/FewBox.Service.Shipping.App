import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { MasterPage, MessageType } from './State';

const master = { isMessageVisiable: false, title: '', message: { type: MessageType.Loading, intlId: '' } };
export default (state: MasterPage = master, action: IAction<string> | IAction<boolean>) => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            return { ...state, isMessageVisiable: true, message: { type: MessageType.Loading, intlId: 'Message.Loading' } };
        case ActionTypes.END_LOADING:
            return { ...state, isMessageVisiable: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isMessageVisiable: true, message: action.value };
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