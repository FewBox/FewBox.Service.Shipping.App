import ActionTypes from '../actions/ActionTypes';
import { CredentialPage } from './State';

const credentialState = {
    credentials: []
};
export default (state: CredentialPage = credentialState, action: any): CredentialPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CREDENTIAL:
            return { ...state, credentials: action.payload };
        default:
            return state;
    }
}