import ActionTypes from '../actions/ActionTypes';
import { JobPage } from './State';

const jobState = {
    jobs: [],
    isListLoading: false
};
export default (state: JobPage = jobState, action: any): JobPage => {
    switch (action.type) {
        case ActionTypes.INIT_JOB_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_JOB:
            return { ...state, jobs: action.payload, isListLoading: false };
        default:
            return state;
    }
}