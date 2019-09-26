import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadContainerShip, initContainerShipPage, fillContainerShipServiceAccountDropdownList } from '../actions';

const initContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CONTAINERSHIPPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containerships/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/containerships', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadContainerShip(payload);
        })
    );

const switchContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containerships/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/containerships', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadContainerShip(payload);
        })
    );
const sinkContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SINK_CONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerships/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initContainerShipPage();
        })
    );
const constructContainerShipEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.BUILD_TEMPORARYCONTAINERSHIP),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerships', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initContainerShipPage();
        })
    );
const initServiceAccountDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/namespaces/' + action.value + '/serviceaccounts', method: 'GET' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return fillContainerShipServiceAccountDropdownList(payload);
        })
    );

export default [initContainerShipEpic, switchContainerShipEpic, sinkContainerShipEpic, constructContainerShipEpic, initServiceAccountDropdownListEpic];