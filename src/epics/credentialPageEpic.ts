import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initCredentialPage, loadCredential } from '../actions';

const initCredentialPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CREDENTIALPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/credentials/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCredential(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/credentials', method: 'GET' },
                    (payload) => {
                        return loadCredential(payload);
                    });
            }
        })
    );

const issueCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ISSUE_CREDENTIAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/credentials', method: 'POST', body: action.value },
                    (payload) => {
                        return initCredentialPage();
                    });
        })
    );

const revokeCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.REVOKE_CREDENTIAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/credentials/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' },
                    (payload) => {
                        return initCredentialPage();
                    });
        })
    );

const switchCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/credentials/fewbox', method: 'GET' },
                    (payload) => {
                        return loadCredential(payload);
                    });
            }
            else {
                return AjaxObservable({ path: '/api/credentials', method: 'GET' },
                    (payload) => {
                        return loadCredential(payload);
                    });
            }
        })
    );

export default [initCredentialPageEpic, issueCredentialEpic, revokeCredentialEpic, switchCredentialEpic];