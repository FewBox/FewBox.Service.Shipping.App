import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IAjaxSetting } from './Fetch';
import { PROTOCOL, HOST, PORT, HEADER, METHOD, RESPONSETYPE } from '../config';
import { showMessage, redirect } from '../actions';
import { MessageType } from '@fewbox/react-components';

const initAjaxSetting = (ajaxSetting: IAjaxSetting) => {
    return {
        url: _.template('<%= protocol %>://<%= host %>:<%= port %><%= path %>')({ 'protocol': ajaxSetting.protocol ? ajaxSetting.protocol : PROTOCOL, 'host': ajaxSetting.host ? ajaxSetting.host : HOST, 'port': ajaxSetting.port ? ajaxSetting.port : PORT, 'path': ajaxSetting.path }),
        body: ajaxSetting.body ? JSON.stringify(ajaxSetting.body) : undefined,
        crossDomain: ajaxSetting.crossDomain ? ajaxSetting.crossDomain : true,
        headers: { ...(ajaxSetting.headers ? ajaxSetting.headers : HEADER), Authorization: window.localStorage.getItem('token') },
        method: String(ajaxSetting.method ? ajaxSetting.method : METHOD),
        responseType: ajaxSetting.responseType ? ajaxSetting.responseType : RESPONSETYPE,
        withCredentials: !!ajaxSetting.withCredentials
    }
};

class GraphQLObservable extends Observable<any>{
    constructor(ajaxSetting: IAjaxSetting) {
        var options = initAjaxSetting(ajaxSetting);
        super(subscriber => {
            fetch(options.url, options)
                .then(r => r.json())
                .then(response => {
                    if (response.isSuccessful) {
                        subscriber.next(response.data);
                    }
                    else {
                        subscriber.error(of(showMessage(MessageType.Error, 'Message.BusinessException', { errorMessage: response.errorMessage })));
                    }
                })
                .catch(error => {
                    if (error.status == 401 || error.status == 403) {
                        subscriber.error(of(redirect('/signin')));
                    }
                    subscriber.error(of(showMessage(MessageType.Error, 'Message.NetworkException', { errorMessage: error.message })));
                });
        });
    }
}

export default GraphQLObservable;