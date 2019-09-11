import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/ajaxObservable';
import { Store } from '../reducers/State';
import { changeLanguage, fillShippingLineDropdownList, fillCredentialDropdownList, fillCaptainDropdownList, fillGateAreaDropdownList, fillQuayAreaDropdownList } from '../actions';

const changeLanguageEric = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_LANGUAGE),
        map((action) => {
            return changeLanguage(action.lang);
        })
    );

const initShippingLineDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_SHIPPINGLINEDROPDOWNLIST),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/shippinglines/fewbox', method: 'GET' },
                    (payload) => {
                        return fillShippingLineDropdownList(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/shippinglines', method: 'GET' },
                    (payload) => {
                        return fillShippingLineDropdownList(payload);
                    });
            }
        })
    );

const initCredentialDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CREDENTIALDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/credentials', method: 'GET' },
                (payload) => {
                    return fillCredentialDropdownList(payload);
                });
        })
    );

const initCaptainDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CAPTAINDROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/captains', method: 'GET' },
                (payload) => {
                    return fillCaptainDropdownList(payload);
                });
        })
    );

const initGateAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_GATEAREADROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/gateareas', method: 'GET' },
                (payload) => {
                    return fillGateAreaDropdownList(payload);
                });
        })
    );

const initQuayAreaDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_QUAYAREADROPDOWNLIST),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/shippinglines/' + action.value + '/quayareas', method: 'GET' },
                (payload) => {
                    return fillQuayAreaDropdownList(payload);
                });
        })
    );

export default [changeLanguageEric, initShippingLineDropdownListEpic, initCredentialDropdownListEpic, initCaptainDropdownListEpic, initGateAreaDropdownListEpic, initQuayAreaDropdownListEpic];