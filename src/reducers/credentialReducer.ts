import ActionTypes from '../actions/ActionTypes';
import { CredentialPage } from './State';

const credentialState = {
    credentials: [],
    stampComponents: []
};
export default (state: CredentialPage = credentialState, action: any): CredentialPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CREDENTIAL:
            return { ...state, credentials: action.payload };
        case ActionTypes.ADD_STAMPCOMPONENT:
            let stampComponents = [...state.stampComponents, { name: 'stamp' + action.value }];
            return { ...state, stampComponents: stampComponents };
        case ActionTypes.REMOVE_STAMPCOMPONENT:
            let removedStampComponents = [...state.stampComponents.slice(0, action.value), ...state.stampComponents.slice(action.value + 1)];
            return { ...state, stampComponents: removedStampComponents };
        default:
            return state;
    }
}