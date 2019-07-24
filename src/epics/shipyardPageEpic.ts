import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShipyard } from '../actions';

const initShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyard', method: 'GET', body: action.value },
                (payload) => {
                    return loadShipyard(payload);
                });
        })
    );

export default [initShipyardEpic];