import * as _ from 'lodash';
import { StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax';
import { beginLoading, endLoading, showMessage, redirect } from '../actions';
import { IAjaxSetting } from './Fetch';
import { MessageType } from '../reducers/State';
import { HOST, PORT, HEADER, METHOD, RESPONSETYPE } from '../config';
import { map, catchError, retry, startWith, endWith } from 'rxjs/operators';


const initAjaxSetting = (ajaxSetting: IAjaxSetting): AjaxRequest => {
    return {
        url: _.template('<%= host %>:<%= port %><%= path %>')({ 'host': HOST, 'port': PORT, 'path': ajaxSetting.path }),
        body: ajaxSetting.body ? JSON.stringify(ajaxSetting.body) : undefined,
        crossDomain: ajaxSetting.crossDomain? ajaxSetting.crossDomain : true,
        headers: { ...(ajaxSetting.headers ? ajaxSetting.headers : HEADER), Authorization: window.localStorage.getItem('token') },
        method: String(ajaxSetting.method ? ajaxSetting.method : METHOD),
        responseType: ajaxSetting.responseType ? ajaxSetting.responseType : RESPONSETYPE,
        withCredentials: !!ajaxSetting.withCredentials
    }
};

const ajaxObservable = (ajaxSetting: IAjaxSetting, handlePayload$: (payload)=>{}): Observable<any> => {
    var options = initAjaxSetting(ajaxSetting);
    var handlePayload = handlePayload$;
    return ajax(options).pipe(
        map((ajaxResponse: AjaxResponse) => {
            if (ajaxResponse.response.isSuccessful == false) {
                return showMessage({ content: ajaxResponse.response.errorMessage, type: MessageType.Error });
            }
            return handlePayload(ajaxResponse.response.payload);
        }),
        retry(3),
        catchError(error => {
            if(error.status == 401||error.status == 403)
            {
                return of(redirect('/signin'));
            }
            return of(showMessage({ content: 'Network Exception', type: MessageType.Error }));
        }),
        startWith(beginLoading()),
        endWith(endLoading())
    );
};

export default ajaxObservable;