import ActionTypes from '../actions/ActionTypes';
import { ServiceEntryPage } from './State';

const serviceEntryState = {
    serviceEntries: []
};
export default (state: ServiceEntryPage = serviceEntryState, action: any): ServiceEntryPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SERVICEENTRY:
            return { ...state, serviceEntries: action.payload };
        default:
            return state;
    }
}