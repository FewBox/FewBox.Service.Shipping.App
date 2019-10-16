import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import GraphQLObservable from '../fetch/GraphQLObservable';
import { redirect, showMessage, hideLockWindow } from '../actions';
// @ts-ignore
import { AUTH_PROTOCOL, AUTH_HOST, AUTH_PORT } from 'appsettings';
import { MessageType } from '@fewbox/react-components';

const signInEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNIN),
        mergeMap((action) => {
            //return of({token: 'FewBox'});
            let graphql = `mutation {
                signin(input: {username: "${action.value.username}", password: "${action.value.password}", userType: "Form"}) {
                  isSuccessful
                  errorCode
                  errorMessage
                  payload {
                    isValid
                    token
                  }
                }
              }`;
            let body = {
                query: graphql
            };
            return new GraphQLObservable({ protocol: AUTH_PROTOCOL, host: AUTH_HOST, port: AUTH_PORT, method: 'POST', path: '/graphql', body: body, prop: 'signin' });
        }),
        map((payload) => {
            if (payload.isValid) {
                window.localStorage.setItem('token', payload.token);
                return redirect('/master/landing');
            }
            else {
                return showMessage(MessageType.Error, 'Message.UsernameOrPasswordIsNotValid');
            }
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const reSignInEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.RESIGNIN),
        mergeMap((action) => {
            let graphql = `mutation {
                signin(input: {username: "${action.value.username}", password: "${action.value.password}", userType: "Form"}) {
                  isSuccessful
                  errorCode
                  errorMessage
                  payload {
                    isValid
                    token
                  }
                }
              }`;
            let body = {
                query: graphql
            };
            return new GraphQLObservable({ protocol: AUTH_PROTOCOL, host: AUTH_HOST, port: AUTH_PORT, method: 'POST', path: '/graphql', body: body, prop: 'signin' });
        }),
        map((payload) => {
            if (payload.isValid) {
                window.localStorage.setItem('token', payload.token);
                return hideLockWindow();
            }
            else {
                return showMessage(MessageType.Error, 'Message.UsernameOrPasswordIsNotValid');
            }
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

const signOutEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNOUT),
        map(() => {
            window.localStorage.removeItem('token');
            return redirect('/');
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [signInEpic, reSignInEpic, signOutEpic];