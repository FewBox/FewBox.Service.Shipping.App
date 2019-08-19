import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadCountry } from '../actions';
import { IAction } from '../actions/Action';

const initCountryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_COUNTRYPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/countries/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCountry(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/countries', method: 'GET' },
                    (payload) => {
                        return loadCountry(payload);
                    });
            }
        })
    );

const switchCountryPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action: IAction<boolean>) => {
            if (action.value) {
                return AjaxObservable({ path: '/api/countries/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCountry(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/countries', method: 'GET' },
                    (payload) => {
                        return loadCountry(payload);
                    });
            }
        })
    );

export default [initCountryPageEpic, switchCountryPageEpic];