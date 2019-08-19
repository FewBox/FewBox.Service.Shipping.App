import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadContainerShip, initContainerShipPage } from '../actions';

const initContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CONTAINERSHIPPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containerships/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containerships', method: 'GET' },
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
                return AjaxObservable({ path: '/api/containerships/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containerships', method: 'GET' },
                    (payload) => {
                        return loadContainerShip(payload);
                    });
            }
        })
    );
const sinkContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SINK_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerships/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initContainerShipPage();
                });
        })
    );
const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.BUILD_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerships', method: 'POST', body: action.value },
                (payload) => {
                    return initContainerShipPage();
                });
        })
    );


export default [initContainerShipEpic, switchContainerShipEpic, sinkContainerShipEpic, constructContainerShipEpic];