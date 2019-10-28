import ActionTypes from '../actions/ActionTypes';
import { SecretPage } from './State';

const secretState = {
    selectedSecret: { datas: [] },
    items: [],
    isListLoading: false
};
export default (state: SecretPage = secretState, action: any): SecretPage => {
    switch (action.type) {
        case ActionTypes.INIT_SECRET_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SECRET:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_SELECTED_SECRET:
            return { ...state, selectedSecret: action.payload };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}