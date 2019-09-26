import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of, zip, empty } from "rxjs";
import { switchMap, map, mergeMap, startWith, endWith } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadLanding, beginLoading, endLoading } from '../actions';

const initLandingPageEric = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_LANDINGPAGE),
        switchMap(() => {
            return zip(AjaxObservable({ path: '/api/componentStatuses', method: 'GET' }), AjaxObservable({ path: '/api/componentStatuses', method: 'GET' }));
        }),
        map((payloads) => {
            for (var key in payloads) {
                if (payloads[key].type) {
                    return payloads[key];
                }
            }
            return loadLanding({ componentStatuses: payloads[0] });
        })
    );

export default [initLandingPageEric];