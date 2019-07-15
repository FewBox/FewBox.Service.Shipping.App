import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShippingLanePage } from '../actions';

const initShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPPINGLANEPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane', method: 'GET', body: action.value }, 
            (payload) => {
                return loadShippingLanePage(payload);
            });
        })
    );

const startShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.START_SHIPPINGLANE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglane', method: 'POST', body: action.value }, 
            (payload) => {
                return loadShippingLanePage(payload);
            });
        })
    );
const closeShippingLaneEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CLOSE_SHIPPINGLANE),
        mergeMap((action) => {
            debugger;
            return AjaxObservable({ path: '/api/shippinglane/' + action.value, method: 'DELETE' }, 
            (payload) => {
                return loadShippingLanePage(payload);
            });
        })
    );

export default [initShippingLaneEpic, startShippingLaneEpic, closeShippingLaneEpic];