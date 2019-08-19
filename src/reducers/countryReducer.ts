import ActionTypes from '../actions/ActionTypes';
import { CountryPage } from './State';

const countryState = {
    countries: []
};
export default (state: CountryPage = countryState, action: any): CountryPage => {
    switch (action.type) {
        case ActionTypes.LOAD_COUNTRY:
            return { ...state, countries: action.payload };
        default:
            return state;
    }
}