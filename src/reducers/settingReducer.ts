import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { SettingPage } from './State';

const settingState = { lang: 'en-us', isFewBoxDelivery: true, isHelp: localStorage.getItem('isHelp') === 'true', isEnableDockerRegistry: localStorage.getItem('isEnableDockerRegistry') === 'true' };
export default (state: SettingPage = settingState, action: IAction<any>): SettingPage => {
    switch (action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            return { ...state, lang: action.value };
        case ActionTypes.SWITCH_FEWBOXDELIVERY:
            return { ...state, isFewBoxDelivery: action.value };
        case ActionTypes.SWITCH_HELP:
            window.localStorage.setItem('isHelp', action.value);
            return { ...state, isHelp: action.value };
        case ActionTypes.SWITCH_ENABLE_DOCKERREGISTRY:
            window.localStorage.setItem('isEnableDockerRegistry', action.value);
            return { ...state, isEnableDockerRegistry: action.value };
        default:
            return state;
    }
}