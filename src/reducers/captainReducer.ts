import ActionTypes from '../actions/ActionTypes';
import { CountryPage, CaptainPage } from './State';

const captainState = {
    captains: []
};
export default (state: CaptainPage = captainState, action: any): CaptainPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CAPTAIN:
            return { ...state, captains: action.payload };
        default:
            return state;
    }
}