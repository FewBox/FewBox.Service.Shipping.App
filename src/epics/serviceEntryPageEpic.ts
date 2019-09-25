import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initFreeTradeAreaPage, loadFreeTradeArea } from '../actions';

const initFreeTradeAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_FREETRADEAREAPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/freetradeareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/freetradeareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadFreeTradeArea(payload);
        })
    );
const switchFreeTradeAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/freetradeareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/freetradeareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadFreeTradeArea(payload);
        })
    );
const constructFreeTradeAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_FREETRADEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/freetradeareas', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initFreeTradeAreaPage();
        })
    );
const demolishFreeTradeAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_FREETRADEAREA),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/freetradeareas/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initFreeTradeAreaPage();
        })
    );

export default [initFreeTradeAreaPageEpic, constructFreeTradeAreaPageEpic, switchFreeTradeAreaEpic, demolishFreeTradeAreaPageEpic];