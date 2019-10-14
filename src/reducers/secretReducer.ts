import ActionTypes from '../actions/ActionTypes';
import { SecretPage } from './State';

const secretState = {
    secrets: [],
    isListLoading: false
};
export default (state: SecretPage = secretState, action: any): SecretPage => {
    switch (action.type) {
        case ActionTypes.INIT_SECRET_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SECRET:
            return { ...state, secrets: action.payload, isListLoading: false };
        default:
            return state;
    }
}