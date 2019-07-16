import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import { redirect, empty } from '../actions';

const signInEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNIN),
        mergeMap((action) => {
            //return AjaxObservable({ path: '/api/signin', method: 'POST', body: { username: action.value.username, password: action.value.password } }, store$);
            if(action.value.password == '401' || action.value.password == '403' || action.value.password == '500'){
                return AjaxObservable({ path: '/status/'+action.value.password, method: 'POST', body: { username: action.value.username, password: action.value.password } }, 
                (payload)=>{
                    return null;
                });
            }
            else if(action.value.password=='200')
            {
                window.localStorage.setItem('token', '');
                return of(redirect('/master/landing'));
            }
            else{
                return of({ isValid:true, token:'Bearer {token}' });
            }
        })
    );

const signOutEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SIGNOUT),
        map(() => {
            window.localStorage.removeItem('token');
            return empty('Sign Out.');
        })
    );

export default [signInEpic, signOutEpic];