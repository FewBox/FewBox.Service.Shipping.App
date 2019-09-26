import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadGateway, initGatewayPage } from '../actions';

const initGatewayPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEWAY_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gatewaies/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gatewaies', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadGateway(payload);
        })
    );
const switchGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gatewaies/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gatewaies', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadGateway(payload);
        })
    );
const createGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_GATEWAY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gatewaies', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initGatewayPage();
        })
    );
const deleteGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_GATEWAY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gatewaies/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initGatewayPage();
        })
    );

export default [initGatewayPageEpic, switchGatewayEpic, createGatewayEpic, deleteGatewayEpic];