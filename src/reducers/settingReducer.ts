import ActionTypes from '../actions/ActionTypes';
import { IPayloadAction } from '../actions/Action';
import { SettingPage } from './State';

const settingState = { lang: 'en-us', isFewBoxDelivery: false };
export default (state: SettingPage = settingState, action: IPayloadAction<string>): SettingPage => {
    switch (action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}