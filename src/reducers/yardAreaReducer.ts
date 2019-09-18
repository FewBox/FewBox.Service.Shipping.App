import ActionTypes from '../actions/ActionTypes';
import { YardAreaPage } from './State';

const yardAreaState = {
    yardAreas: [],
    gateAreas: [],
    quayAreas: []
};
export default (state: YardAreaPage = yardAreaState, action: any): YardAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_YARDAREA:
            return { ...state, yardAreas: action.payload };
        case ActionTypes.FILL_YARDAREAGATEAREADROPDOWNLIST:
            return { ...state, gateAreas: action.payload };
        case ActionTypes.FILL_YARDAREAQUAYAREADROPDOWNLIST:
            return { ...state, quayAreas: action.payload };
        default:
            return state;
    }
}