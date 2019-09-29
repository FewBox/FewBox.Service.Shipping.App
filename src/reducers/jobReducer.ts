import ActionTypes from '../actions/ActionTypes';
import { JobPage } from './State';

const jobState = {
    jobs: []
};
export default (state: JobPage = jobState, action: any): JobPage => {
    switch (action.type) {
        case ActionTypes.LOAD_JOB:
            return { ...state, jobs: action.payload };
        default:
            return state;
    }
}