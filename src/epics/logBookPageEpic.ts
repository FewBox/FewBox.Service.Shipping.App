import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadLogBook, endLoading, beginLoading } from '../actions';

const initLogBookPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LOGBOOK),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/logbook/' + action.value.namespace + '/' + action.value.pod + '/' + action.value.container, method: 'GET' });
        }),
        map((payload) => {
            return loadLogBook(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initLogBookPageEpic];