import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { redirect } from '../actions';
import { AUTH_PROTOCOL, AUTH_HOST, AUTH_PORT } from '../config';

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
            return AjaxObservable({ protocol: AUTH_PROTOCOL, host: AUTH_HOST, port: AUTH_PORT, method: 'POST', path: '/graphql', body: body });
        }),
        map((payload) => {
            if (payload.type) {
                return payload;
            }
            window.localStorage.setItem('token', payload.token);
            return redirect('/master/landing');
        })
    );

const signOutEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNOUT),
        map(() => {
            window.localStorage.removeItem('token');
            return redirect('/');
        })
    );

export default [signInEpic, signOutEpic];