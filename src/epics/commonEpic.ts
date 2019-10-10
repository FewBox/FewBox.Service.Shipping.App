import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, startWith, endWith, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/AjaxObservable';
import { Store } from '../reducers/State';
import { changeLanguage, fillNamespaceDropdownList, endLoading, beginLoading, empty } from '../actions';
import { message } from 'antd';
import { MessageType } from '@fewbox/react-components';
//import { useIntl } from 'react-intl';

const showMessageEpic = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.SHOW_MESSAGE),
        map((action) => {
            /*const intl = useIntl();
            let messageContent = intl.formatMessage({ id: action.value.intlId }, action.value.values);
            switch (action.value.messageType) {
                case MessageType.Error:
                    message.error(messageContent, action.value);
                    break;
                case MessageType.Info:
                    message.info(messageContent, action.value);
                    break;
                case MessageType.Success:
                    message.success(messageContent, action.value);
                    break;
                case MessageType.Warning:
                    message.warning(messageContent, action.value);
                    break;
                default:
                    break;
            }*/
            return empty();
        })
    );

const changeLanguageEpic = (action$: ActionsObservable<any>) =>
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

export default [showMessageEpic, changeLanguageEpic, initNamespaceDropdownListEpic];