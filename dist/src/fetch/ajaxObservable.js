var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { beginLoading, endLoading, showMessage, redirect } from '../actions';
import { HOST, PORT, HEADER, METHOD, RESPONSETYPE } from '../config';
import { map, catchError, retry, startWith, endWith } from 'rxjs/operators';
var initAjaxSetting = function (ajaxSetting) {
    return {
        url: _.template('<%= host %>:<%= port %><%= path %>')({ 'host': HOST, 'port': PORT, 'path': ajaxSetting.path }),
        body: ajaxSetting.body ? JSON.stringify(ajaxSetting.body) : undefined,
        crossDomain: ajaxSetting.crossDomain ? ajaxSetting.crossDomain : true,
        headers: __assign({}, (ajaxSetting.headers ? ajaxSetting.headers : HEADER), { Authorization: window.localStorage.getItem('token') }),
        method: String(ajaxSetting.method ? ajaxSetting.method : METHOD),
        responseType: ajaxSetting.responseType ? ajaxSetting.responseType : RESPONSETYPE,
        withCredentials: !!ajaxSetting.withCredentials
    };
};
var ajaxObservable = function (ajaxSetting, handlePayload$) {
    var options = initAjaxSetting(ajaxSetting);
    var handlePayload = handlePayload$;
    return ajax(options).pipe(map(function (ajaxResponse) {
        if (ajaxResponse.response.isSuccessful == false) {
            return showMessage(1 /* Error */, 'Message.Error', ajaxResponse.response);
        }
        return handlePayload(ajaxResponse.response.payload);
    }), retry(3), catchError(function (error) {
        if (error.status == 401 || error.status == 403) {
            return of(redirect('/signin'));
        }
        return of(showMessage(1 /* Error */, 'Message.Error', error));
    }), startWith(beginLoading()), endWith(endLoading()));
};
export default ajaxObservable;
//# sourceMappingURL=ajaxObservable.js.map