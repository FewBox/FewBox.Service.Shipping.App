import ActionTypes from '../actions/ActionTypes';
import { GateAreaPage } from './State';

const gateAreaState = {
    gateAreas: []
};
export default (state: GateAreaPage = gateAreaState, action: any): GateAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_GATEAREA:
            return { ...state, gateAreas: action.payload };
        default:
            return state;
    }
}