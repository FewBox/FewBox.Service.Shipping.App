import ActionTypes from '../actions/ActionTypes';
import { YardAreaPage } from './State';

const yardAreaState = {
    yardAreas: []
};
export default (state: YardAreaPage = yardAreaState, action: any): YardAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_YARDAREA:
            return { ...state, yardAreas: action.payload };
        default:
            return state;
    }
}