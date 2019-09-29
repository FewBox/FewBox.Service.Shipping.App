import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { redirect } from '../actions';

const signInEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNIN),
        mergeMap((action) => {
            return of({token: 'FewBox'});
            return AjaxObservable({ path: '/graphql', method: 'POST', body: { username: action.value.username, password: action.value.password } });
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