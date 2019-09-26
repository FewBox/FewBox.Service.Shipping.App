import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { loadGateway, initGatewayPage } from '../actions';

const initGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEWAY_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gateareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gateareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadGateway(payload);
        })
    );
const switchGateAreaEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/gateareas/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/gateareas', method: 'GET' });
            }
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return loadGateway(payload);
        })
    );
const constructGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_GATEWAY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gateareas', method: 'POST', body: action.value });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initGatewayPage();
        })
    );
const demolishGateAreaPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_GATEWAY),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/gateareas/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            return initGatewayPage();
        })
    );

export default [initGateAreaPageEpic, switchGateAreaEpic, constructGateAreaPageEpic, demolishGateAreaPageEpic];