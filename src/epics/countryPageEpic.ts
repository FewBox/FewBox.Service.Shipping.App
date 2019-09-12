import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadCountry } from '../actions';
import { of } from 'rxjs';

const initCountryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_COUNTRYPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/countries', method: 'GET' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadCountry(payload));
        })
    );

export default [initCountryPageEpic];