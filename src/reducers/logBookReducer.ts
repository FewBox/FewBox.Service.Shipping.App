import ActionTypes from '../actions/ActionTypes';
import { LogBookPage } from './State';

const logBookState = {
    logBook: { content: '' }
};
export default (state: LogBookPage = logBookState, action: any): LogBookPage => {
    switch (action.type) {
        case ActionTypes.LOAD_LOGBOOK:
            return { ...state, logBook: action.payload };
        default:
            return state;
    }
}