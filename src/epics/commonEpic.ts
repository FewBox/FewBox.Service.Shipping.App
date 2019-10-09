import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/AjaxObservable';
import { Store } from '../reducers/State';
import { changeLanguage, fillNamespaceDropdownList, endLoading, beginLoading } from '../actions';

const changeLanguageEric = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_LANGUAGE),
        map((action) => {
            return changeLanguage(action.lang);
        })
    );

const initNamespaceDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_NAMESPACE_DROPDOWNLIST),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/namespaces/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/namespaces', method: 'GET' });
            }
        }),
        map((payload) => {
            return fillNamespaceDropdownList(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [changeLanguageEric, initNamespaceDropdownListEpic];