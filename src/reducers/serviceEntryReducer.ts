import ActionTypes from '../actions/ActionTypes';
import { ServiceEntryPage } from './State';

const serviceEntryState = {
    serviceEntries: [],
    isListLoading: false
};
export default (state: ServiceEntryPage = serviceEntryState, action: any): ServiceEntryPage => {
    switch (action.type) {
        case ActionTypes.INIT_SERVICEENTRY_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SERVICEENTRY:
            return { ...state, serviceEntries: action.payload, isListLoading: false };
        default:
            return state;
    }
}