import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadLogBook } from '../actions';

const initLogBookPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LOGBOOK),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/logbook/' + action.value.namespace + '/' + action.value.pod + '/' + action.value.container, method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadLogBook(payload);
        })
    );

export default [initLogBookPageEpic];