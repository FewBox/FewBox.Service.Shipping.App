import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadNode } from '../actions';
import { beginLoading } from '../../dist/dist/src/actions';
import { endLoading } from '../../dist/src/actions';

const initNodePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NODEPAGE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/nodes', method: 'GET' });
        }),
        map((payload) => {
            return loadNode(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initNodePageEpic];