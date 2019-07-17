import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { MasterPage } from './State';
import { MessageType } from 'fewbox-react-components';

const master = { messageType: MessageType.Loading, messageIntlId: '', messageIsVisible: false };
export default (state: MasterPage = master, action: IAction<any>): MasterPage => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOADING:
            console.log('Begin Loading');
            return { ...state, messageIsVisible: true, messageType: MessageType.Loading, messageIntlId: 'Message.Loading' };
        case ActionTypes.END_LOADING:
            console.log('End Loading');
            return { ...state, messageIsVisible: false };
        case ActionTypes.SHOW_MESSAGE:
            console.log('Show Message');
            return { ...state, messageIsVisible: true, messageType: action.value.type, messageIntlId: action.value.intlId, messageValues: action.value.values };
        case ActionTypes.REDIRECT:
            return { ...state, path: action.value };
        case ActionTypes.CLEAR_PATH:
            return { ...state, path: undefined };
        default:
            return state;
    }
}