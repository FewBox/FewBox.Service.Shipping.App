import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initDockPage, loadDock } from '../actions';

const initDockPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DOCKPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/dock/fewbox', method: 'GET' },
                    (payload) => {
                        return loadDock(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/dock', method: 'GET' },
                    (payload) => {
                        return loadDock(payload);
                    });
            }
        })
    );
const switchDockEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/dock/fewbox', method: 'GET' },
                    (payload) => {
                        return loadDock(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/dock', method: 'GET' },
                    (payload) => {
                        return loadDock(payload);
                    });
            }
        })
    );
const buildDockPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.BUILD_DOCK),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/dock', method: 'POST', body: action.value },
                (payload) => {
                    return initDockPage();
                });
        })
    );
const demolishDockPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DEMOLISH_DOCK),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/dock/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                (payload) => {
                    return initDockPage();
                });
        })
    );

export default [initDockPageEpic, buildDockPageEpic, switchDockEpic, demolishDockPageEpic];