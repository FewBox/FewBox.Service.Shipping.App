import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/Action';
import { SignIn } from './State';

const signInState = {
    isUsernameAndPasswordValid: true
};
export default (state: SignIn = signInState, action: IAction<boolean>): SignIn => {
    switch (action.type) {
        case ActionTypes.SET_VALIDSTATUS:
            return { ...state, isUsernameAndPasswordValid: action.value };
        default:
            return state;
    }
}