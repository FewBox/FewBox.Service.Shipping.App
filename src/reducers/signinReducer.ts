import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { SignInPage } from './State';

const signInState = {
    isUsernameAndPasswordValid: true,
    isSignInButtonLoading: false
};
export default (state: SignInPage = signInState, action: IAction<boolean>): SignInPage => {
    switch (action.type) {
        case ActionTypes.SIGNIN:
            return { ...state, isSignInButtonLoading: true };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isSignInButtonLoading: false };
        case ActionTypes.SET_VALIDSTATUS:
            return { ...state, isUsernameAndPasswordValid: action.value, isSignInButtonLoading: false };
        default:
            return state;
    }
}