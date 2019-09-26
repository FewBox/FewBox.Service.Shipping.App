import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadNode } from '../actions';

const initNodePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NODEPAGE),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/nodes', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadNode(payload);
        })
    );

export default [initNodePageEpic];