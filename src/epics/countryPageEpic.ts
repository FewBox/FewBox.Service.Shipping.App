import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadCountry } from '../actions';

const initCountryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_COUNTRYPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/countries', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadCountry(payload);
        })
    );

export default [initCountryPageEpic];