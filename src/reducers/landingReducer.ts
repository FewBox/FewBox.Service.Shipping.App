import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { Landing, Contributor } from './State';

const landingState = {
    contributors: []
};
export default (state: Landing = landingState, action: IPayloadAction<Contributor[]>): Landing => {
    switch (action.type) {
        case ActionTypes.LOAD_LANDINGPAGE:
            return { ...state, contributors: action.payload };
        default:
            return state;
    }
}