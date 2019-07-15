import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { SignInPage } from './State';

const signInState = {
    isUsernameAndPasswordValid: true
};
export default (state: SignInPage = signInState, action: IAction<boolean>): SignInPage => {
    switch (action.type) {
        case ActionTypes.SET_VALIDSTATUS:
            return { ...state, isUsernameAndPasswordValid: action.value };
        default:
            return state;
    }
}