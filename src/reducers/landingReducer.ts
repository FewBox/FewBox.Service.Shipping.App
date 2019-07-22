import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { LandingPage, Contributor } from './State';

const landingState = {
    contributors: []
};
export default (state: LandingPage = landingState, action: IPayloadAction<Contributor[]>): LandingPage => {
    switch (action.type) {
        case ActionTypes.LOAD_LANDING:
            return { ...state, contributors: action.payload };
        default:
            return state;
    }
}