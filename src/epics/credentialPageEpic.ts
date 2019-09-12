import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { initCredentialPage, loadCredential } from '../actions';
import { of } from 'rxjs';

const initCredentialPageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CREDENTIALPAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/credentials/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/credentials', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadCredential(payload));
        })
    );

const issueCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.ISSUE_CREDENTIAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/credentials', method: 'POST', body: action.value });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initCredentialPage());
        })
    );

const revokeCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.REVOKE_CREDENTIAL),
        mergeMap((action) => {
            return AjaxObservable({ path: '/api/credentials/' + action.value.shippingLine + '/' + action.value.name, method: 'DELETE' });
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(initCredentialPage());
        })
    );

const switchCredentialEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return AjaxObservable({ path: '/api/credentials/fewbox', method: 'GET' });
            }
            else {
                return AjaxObservable({ path: '/api/credentials', method: 'GET' });
            }
        }),
        mergeMap((payload) => {
            if (payload.type) {
                return of(payload);
            }
            return of(loadCredential(payload));
        })
    );

export default [initCredentialPageEpic, issueCredentialEpic, revokeCredentialEpic, switchCredentialEpic];