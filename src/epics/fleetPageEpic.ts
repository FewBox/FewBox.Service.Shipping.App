import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initFleetPage, loadFleet } from '../actions';

const initFleetPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_FLEETPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/fleet/fewbox', method: 'GET' },
                    (payload) => {
                        return loadFleet(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/fleet', method: 'GET' },
                    (payload) => {
                        return loadFleet(payload);
                    });
            }
        })
    );
const setupFleetPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SETUP_FLEET),
        mergeMap((action) => {
            debugger;
            return AjaxObservable({ path: '/api/fleet', method: 'POST', body: action.value },
                (payload) => {
                    return initFleetPage();
                });
        })
    );

export default [initFleetPageEpic, setupFleetPageEpic];