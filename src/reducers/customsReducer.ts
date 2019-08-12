import ActionTypes from '../actions/ActionTypes';
import { CustomsPage } from './State';

const customState = {
    customs: []
};
export default (state: CustomsPage = customState, action: any): CustomsPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CUSTOMS:
            return { ...state, customs: action.payload };
        default:
            return state;
    }
}