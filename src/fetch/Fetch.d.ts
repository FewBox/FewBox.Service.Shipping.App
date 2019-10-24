export interface IAjaxSetting {
    url?: string;
    protocol?: string;
    host?: string;
    port?: number;
    basePath?: string;
    path?: string;
    queryParams?: object;
    body?: object;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: object;
    timeout?: number;
    crossDomain?: boolean;
    withCredentials?: boolean;
    responseType?: string;
    isDirectly?: boolean;
}
export interface IJsonSetting {
    path: string;
}
export interface IGraphQLSetting {
    prop: string;
    protocol?: string;
    host?: string;
    port?: number;
    basePath?: string;
    path?: string;
    queryParams?: object;
    body?: object;
    method?: 'GET' | 'POST';
    headers?: object;
    timeout?: number;
    crossDomain?: boolean;
    withCredentials?: boolean;
    responseType?: string;
}