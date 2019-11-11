import * as _ from 'lodash';
import { Observable, of, empty } from 'rxjs';
import { showMessage, showLockWindow } from '../actions';
import { IAjaxSetting } from './Fetch';
// @ts-ignore
// import { PROTOCOL, HOST, PORT, BASEPATH, HEADER, METHOD, RESPONSETYPE } from 'appsettings';
import { MessageType } from '@fewbox/react-components';

const initAjaxSetting = (ajaxSetting: IAjaxSetting) => {
    let appsettings = window.localStorage.getItem(`${location.hostname}_shipping_appsettings`);
    const { PROTOCOL, HOST, PORT, BASEPATH, HEADER, METHOD, RESPONSETYPE } = JSON.parse(appsettings ? appsettings : '{}');
    let headers;
    if (window.localStorage.getItem(`${location.hostname}_token`)) {
        headers = { ...(ajaxSetting.headers ? ajaxSetting.headers : HEADER), Authorization: `Bearer ${window.localStorage.getItem(`${location.hostname}_token`)}` };
    }
    else {
        headers = { ...(ajaxSetting.headers ? ajaxSetting.headers : HEADER) };
    }
    return {
        url: ajaxSetting.url ? ajaxSetting.url : _.template('${protocol}://${host}:${port}${basePath}${path}')({ 'protocol': ajaxSetting.protocol ? ajaxSetting.protocol : PROTOCOL, 'host': ajaxSetting.host ? ajaxSetting.host : HOST, 'port': ajaxSetting.port ? ajaxSetting.port : PORT, 'basePath': ajaxSetting.basePath ? ajaxSetting.basePath : BASEPATH, 'path': ajaxSetting.path }),
        body: ajaxSetting.body ? JSON.stringify(ajaxSetting.body) : undefined,
        crossDomain: ajaxSetting.crossDomain ? ajaxSetting.crossDomain : true,
        headers: headers,
        method: String(ajaxSetting.method ? ajaxSetting.method : METHOD),
        responseType: ajaxSetting.responseType ? ajaxSetting.responseType : RESPONSETYPE,
        withCredentials: !!ajaxSetting.withCredentials,
        isDirectly: ajaxSetting.isDirectly
    }
};

class AjaxObservable extends Observable<any>{
    constructor(ajaxSetting: IAjaxSetting) {
        var options = initAjaxSetting(ajaxSetting);
        super(subscriber => {
            fetch(options.url, options)
                .then(r => {
                    if (r.ok) {
                        return r.json();
                    } else {
                        if (r.status == 401 || r.status == 403) {
                            subscriber.error(of(showLockWindow()));
                        }
                        else {
                            return { isSuccessful: false, errorMessage: r.statusText };
                        }
                    }
                })
                .then(result => {
                    if (options.isDirectly) {
                        subscriber.next(result);
                    }
                    else {
                        if (result.isSuccessful) {
                            subscriber.next(result.payload);
                        }
                        else {
                            subscriber.error(of(showMessage(MessageType.Error, 'Message.BusinessException', { errorMessage: result.errorMessage })));
                        }
                    }
                })
                .catch(error => {
                    if (error.message) {
                        subscriber.error(of(showMessage(MessageType.Error, 'Message.NetworkException', { errorMessage: error.message })));
                    }
                    else {
                        subscriber.error(of(showMessage(MessageType.Error, 'Message.SystemException', { errorMessage: error })));
                    }
                });
        });
    }
}

export default AjaxObservable;