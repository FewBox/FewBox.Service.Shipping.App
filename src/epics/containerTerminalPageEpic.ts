import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initContainerTerminalPage, loadContainerTerminal } from '../actions';

const initContainerTerminalPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CONTAINERTERMINALPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containerterminal/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerTerminal(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containerterminal', method: 'GET' },
                    (payload) => {
                        return loadContainerTerminal(payload);
                    });
            }
        })
    );
const switchContainerTerminalEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/containerterminal/fewbox', method: 'GET' },
                    (payload) => {
                        return loadContainerTerminal(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/containerterminal', method: 'GET' },
                    (payload) => {
                        return loadContainerTerminal(payload);
                    });
            }
        })
    );
const constructContainerTerminalPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERTERMINAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerterminal', method: 'POST', body: action.value },
                (payload) => {
                    return initContainerTerminalPage();
                });
        })
    );
const demolishContainerTerminalPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CONSTRUCT_CONTAINERTERMINAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/containerterminal/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initContainerTerminalPage();
                });
        })
    );

export default [initContainerTerminalPageEpic, constructContainerTerminalPageEpic, switchContainerTerminalEpic, demolishContainerTerminalPageEpic];