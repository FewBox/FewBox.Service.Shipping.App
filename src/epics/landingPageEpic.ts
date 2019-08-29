import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadLanding } from '../actions';

const initLandingPageEric = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LANDINGPAGE),
        switchMap(() => {
            //return AjaxObservable({ path: '/api/dashboard', method: 'GET' }, store);
            return of();
        }),
        map((response: any) => {
            //return loadLandingPage(response.value.payload);
            return loadLanding(response.contributors);
        })
    );

export default [initLandingPageEric];