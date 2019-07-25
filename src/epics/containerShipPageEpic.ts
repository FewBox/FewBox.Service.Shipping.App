import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadContainerShip } from '../actions';

const initContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CONTAINERSHIPPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containership/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containership', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
        })
    );

const switchContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containership/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containership', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
        })
    );

export default [initContainerShipEpic, switchContainerShipEpic];