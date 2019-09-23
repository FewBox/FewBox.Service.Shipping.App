import ActionTypes from '../actions/ActionTypes';
import { FreeTradeAreaPage } from './State';

const freeTradeAreaState = {
    freeTradeAreas: []
};
export default (state: FreeTradeAreaPage = freeTradeAreaState, action: any): FreeTradeAreaPage => {
    switch (action.type) {
        case ActionTypes.LOAD_FREETRADEAREA:
            return { ...state, freeTradeAreas: action.payload };
        default:
            return state;
    }
}