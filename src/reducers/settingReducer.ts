import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { SettingPage } from './State';

const settingState = { lang: 'en-us', isFewBoxDelivery: true, isHelp: localStorage.getItem(`${location.hostname}_isHelp`) === 'true', isEnableDockerRegistry: localStorage.getItem(`${location.hostname}_isEnableDockerRegistry`) === 'true' };
export default (state: SettingPage = settingState, action: IAction<any>): SettingPage => {
    switch (action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            return { ...state, lang: action.value };
        case ActionTypes.SWITCH_FEWBOXDELIVERY:
            return { ...state, isFewBoxDelivery: action.value };
        case ActionTypes.SWITCH_HELP:
            window.localStorage.setItem(`${location.hostname}_isHelp`, action.value);
            return { ...state, isHelp: action.value };
        default:
            return state;
    }
}