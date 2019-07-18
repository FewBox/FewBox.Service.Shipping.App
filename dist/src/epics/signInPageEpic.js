import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/ajaxObservable';
import { redirect, empty } from '../actions';
var signInEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.SIGNIN), mergeMap(function (action) {
        //return AjaxObservable({ path: '/api/signin', method: 'POST', body: { username: action.value.username, password: action.value.password } }, store$);
        if (action.value.password == '401' || action.value.password == '403' || action.value.password == '500') {
            return AjaxObservable({ path: '/status/' + action.value.password, method: 'POST', body: { username: action.value.username, password: action.value.password } }, function (payload) {
                return null;
            });
        }
        else if (action.value.password == '200') {
            window.localStorage.setItem('token', '');
            return of(redirect('/master/landing'));
        }
        else {
            return of({ isValid: true, token: 'Bearer {token}' });
        }
    }));
};
var signOutEpic = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.SIGNOUT), map(function () {
        window.localStorage.removeItem('token');
        return empty('Sign Out.');
    }));
};
export default [signInEpic, signOutEpic];
//# sourceMappingURL=signInPageEpic.js.map