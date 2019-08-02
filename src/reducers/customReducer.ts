import ActionTypes from '../actions/ActionTypes';
import { CustomPage } from './State';

const customState = {
    customs: []
};
export default (state: CustomPage = customState, action: any): CustomPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CUSTOM:
            return { ...state, customs: action.payload };
        default:
            return state;
    }
}