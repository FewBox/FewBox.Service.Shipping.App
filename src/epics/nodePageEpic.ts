import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadNode } from '../actions';

const initNodePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NODEPAGE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/nodes', method: 'GET' });
        }),
        map((payload) => {
            return loadNode(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initNodePageEpic];