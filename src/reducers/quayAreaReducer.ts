import ActionTypes from '../actions/ActionTypes';
import { QuayAreaPage } from './State';

const quaryAreaState = {
    quayAreas: []
};
export default (state: QuayAreaPage = quaryAreaState, action: any): QuayAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_QUAYAREA:
            return { ...state, quayAreas: action.payload };
        default:
            return state;
    }
}