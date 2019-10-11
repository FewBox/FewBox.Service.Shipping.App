import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of, zip, empty } from "rxjs";
import { switchMap, map, mergeMap, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadLanding, beginLoading, endLoading } from '../actions';

const initLandingPageEric = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LANDING_PAGE),
        switchMap(() => {
            return zip(new AjaxObservable({ path: '/api/componentStatuses', method: 'GET' }), new AjaxObservable({ path: '/api/componentStatuses', method: 'GET' }));
        }),
        map((payloads) => {
            return loadLanding({ componentStatuses: payloads[0] });
        }),
        //startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initLandingPageEric];