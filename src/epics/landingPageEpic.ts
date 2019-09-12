import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of, zip, empty } from "rxjs";
import { switchMap, map, mergeMap, startWith, endWith } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadLanding } from '../actions';

const initLandingPageEric = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LANDINGPAGE),
        switchMap(() => {
            return AjaxObservable({ path: '/api/shippingindustrystatus', method: 'GET' });
        }),
        mergeMap((payload) => {
            if(payload.type)
            {
                return of(payload);
            }
            return of(loadLanding(payload));
        })
    );

export default [initLandingPageEric];