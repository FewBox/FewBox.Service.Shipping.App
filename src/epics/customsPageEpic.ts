import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadCustoms, initCustomsPage } from '../actions';

const initCustomPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CUSTOMSPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/customs/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCustoms(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/customs', method: 'GET' },
                    (payload) => {
                        return loadCustoms(payload);
                    });
            }
        })
    );
const switchCustomEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/customs/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCustoms(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/customs', method: 'GET' },
                    (payload) => {
                        return loadCustoms(payload);
                    });
            }
        })
    );
const constructCustomsPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CUSTOMS),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/customs', method: 'POST', body: action.value },
                (payload) => {
                    return initCustomsPage();
                });
        })
    );
const demolishCustomsPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_CUSTOMS),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/customs/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initCustomsPage();
                });
        })
    );

export default [initCustomPageEpic, switchCustomEpic, constructCustomsPageEpic, demolishCustomsPageEpic];