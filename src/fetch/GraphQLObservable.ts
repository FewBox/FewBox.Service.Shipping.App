import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IGraphQLSetting } from './Fetch';
// @ts-ignore
import { PROTOCOL, HOST, PORT, HEADER, METHOD, RESPONSETYPE } from 'appsettings';
import { showMessage, redirect } from '../actions';
import { MessageType } from '@fewbox/react-components';

const initGraphQLSetting = (graphQLSetting: IGraphQLSetting) => {
    return {
        url: _.template('<%= protocol %>://<%= host %>:<%= port %><%= path %>')({ 'protocol': graphQLSetting.protocol ? graphQLSetting.protocol : PROTOCOL, 'host': graphQLSetting.host ? graphQLSetting.host : HOST, 'port': graphQLSetting.port ? graphQLSetting.port : PORT, 'path': graphQLSetting.path }),
        body: graphQLSetting.body ? JSON.stringify(graphQLSetting.body) : undefined,
        crossDomain: graphQLSetting.crossDomain ? graphQLSetting.crossDomain : true,
        headers: { ...(graphQLSetting.headers ? graphQLSetting.headers : HEADER), Authorization: window.localStorage.getItem('token') },
        method: String(graphQLSetting.method ? graphQLSetting.method : METHOD),
        responseType: graphQLSetting.responseType ? graphQLSetting.responseType : RESPONSETYPE,
        withCredentials: !!graphQLSetting.withCredentials
    }
};

class GraphQLObservable extends Observable<any>{
    constructor(graphQLSetting: IGraphQLSetting) {
        var options = initGraphQLSetting(graphQLSetting);
        super(subscriber => {
            fetch(options.url, options)
                .then(r => {
                    if (r.ok) {
                        return r.json();
                    } else {
                        return { isSuccessful: false, errorMessage: r.statusText };
                    }
                })
                .then(result => {
                    let response = result.data[`${graphQLSetting.prop}`][0];
                    if (response.isSuccessful) {
                        subscriber.next(response.payload);
                    }
                    else {
                        subscriber.error(of(showMessage(MessageType.Error, 'Message.BusinessException', { errorMessage: response.errorMessage })));
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

export default GraphQLObservable;