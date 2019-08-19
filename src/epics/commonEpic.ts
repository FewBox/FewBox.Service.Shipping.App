import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/ajaxObservable';
import { Store } from '../reducers/State';
import { changeLanguage, fillShippingLineDropdownList } from '../actions';

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

export default [changeLanguageEric, initShippingLineDropdownListEpic];