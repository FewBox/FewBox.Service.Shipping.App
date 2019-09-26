import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { LandingPage } from './State';

const landingState = {
    componentStatuses: []
};
export default (state: LandingPage = landingState, action: IPayloadAction<any>): LandingPage => {
    switch (action.type) {
        case ActionTypes.LOAD_LANDING:
            return { ...state, componentStatuses: action.payload.componentStatuses };
        default:
            return state;
    }
}