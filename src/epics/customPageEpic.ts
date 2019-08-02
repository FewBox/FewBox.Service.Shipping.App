import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadCustom } from '../actions';

const initCustomPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CUSTOMPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/custom/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCustom(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/custom', method: 'GET' },
                    (payload) => {
                        return loadCustom(payload);
                    });
            }
        })
    );
const switchCustomEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/custom/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCustom(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/custom', method: 'GET' },
                    (payload) => {
                        return loadCustom(payload);
                    });
            }
        })
    );

export default [initCustomPageEpic, switchCustomEpic];