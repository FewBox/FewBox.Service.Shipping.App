import * as _ from 'lodash';
import { Observable, of, empty } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax';
import { showMessage, redirect, beginLoading, endLoading } from '../actions';
import { IAjaxSetting } from './Fetch';
import { PROTOCOL, HOST, PORT, HEADER, METHOD, RESPONSETYPE } from '../config';
import { map, catchError, retry, startWith, endWith, mergeMap } from 'rxjs/operators';
import { MessageType } from '@fewbox/react-components';

const initAjaxSetting = (ajaxSetting: IAjaxSetting): AjaxRequest => {
    return {
        url: _.template('<%= protocol %>://<%= host %>:<%= port %><%= path %>')({ 'protocol': PROTOCOL, 'host': HOST, 'port': PORT, 'path': ajaxSetting.path }),
        body: ajaxSetting.body ? JSON.stringify(ajaxSetting.body) : undefined,
        crossDomain: ajaxSetting.crossDomain ? ajaxSetting.crossDomain : true,
        headers: { ...(ajaxSetting.headers ? ajaxSetting.headers : HEADER), Authorization: window.localStorage.getItem('token') },
        method: String(ajaxSetting.method ? ajaxSetting.method : METHOD),
        responseType: ajaxSetting.responseType ? ajaxSetting.responseType : RESPONSETYPE,
        withCredentials: !!ajaxSetting.withCredentials
    }
};

const ajaxObservable = (ajaxSetting: IAjaxSetting): Observable<any> => {
    var options = initAjaxSetting(ajaxSetting);
    return ajax(options).pipe(
        map((ajaxResponse: AjaxResponse) => {
            if (ajaxResponse.response.isSuccessful) {
                return ajaxResponse.response.payload ? ajaxResponse.response.payload : {};
            }
            return showMessage(MessageType.Error, 'Message.BusinessException', { errorMessage: ajaxResponse.response.errorMessage });
        }),
        retry(3),
        catchError(error => {
            debugger;
            if (error.status == 401 || error.status == 403) {
                return of(redirect('/signin'));
            }
            return of(showMessage(MessageType.Error, 'Message.NetworkException', { errorMessage: error.message }));
        }),
        startWith(beginLoading()),
        endWith(endLoading())
    );
};

export default ajaxObservable;