import ActionTypes from '../actions/ActionTypes';
import { ServicePage } from './State';

const serviceState = {
    services: []
};
export default (state: ServicePage = serviceState, action: any): ServicePage => {
    switch (action.type) {
        case ActionTypes.LOAD_SERVICE:
            return { ...state, services: action.payload };
        default:
            return state;
    }
}