import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { Setting } from './State';

const settingState = { lang: 'en-us' };
export default (state: Setting = settingState, action: IPayloadAction<string>) => {
    switch (action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}