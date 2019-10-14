import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { loadGateway, initGatewayPage, beginLoading, endLoading } from '../actions';

const initGatewayPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEWAY_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/gateways/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/gateways', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadGateway(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const switchGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/gateways/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/gateways', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadGateway(payload);
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_GATEWAY),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/gateways', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initGatewayPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteGatewayEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_GATEWAY),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/gateways/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initGatewayPage();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initGatewayPageEpic, switchGatewayEpic, createGatewayEpic, deleteGatewayEpic];