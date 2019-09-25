import ActionTypes from '../actions/ActionTypes';
import { SecretPage } from './State';

const secretState = {
    secrets: []
};
export default (state: SecretPage = secretState, action: any): SecretPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SECRET:
            return { ...state, secrets: action.payload };
        default:
            return state;
    }
}