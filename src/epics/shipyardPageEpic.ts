import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadShipyard, initShipyardPage } from '../actions';
import { of } from 'rxjs';

const initShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPYARDPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyard/fewbox', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/shipyard', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
        })
    );

const switchShipyardEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shipyard/fewbox', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/shipyard', method: 'GET' },
                    (payload) => {
                        return loadShipyard(payload);
                    });
            }
        })
    );

const buildContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.BUILD_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shipyard', method: 'POST', body: action.value },
                    (payload) => {
                        return of(payload);
                    });
        }),
        map((response)=>{
            return initShipyardPage();
        })
    );

export default [initShipyardEpic, switchShipyardEpic, buildContainerShipEpic];