export interface IAjaxSetting {
    path?: string;
    queryParams?: object;
    body?: object;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: object;
    timeout?: number;
    crossDomain?: boolean;
    withCredentials?: boolean;
    responseType?: string;
    hiddenLoading?: boolean;
    requestAction?: string;
}
export interface IJsonSetting {
    path : string;
}