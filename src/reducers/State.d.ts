/** Common **/
export interface List<T> {
    items: T[]
}
export interface Paging<T> {
    items: T[];
    itemCount: number;
    pageCount: number;
    pageRange: number;
    pageIndex: number;
}
/** Root **/
export interface Store {
    signin: SignIn;
    master: Master;
    landing: Landing;
    setting: Setting;
}
/** UI **/
export interface SignIn {
    isUsernameAndPasswordValid: boolean;
}
export interface Master {
    isMessageVisiable: boolean;
    message: Message;
    path?: string;
}
export interface Landing {
    contributors: Contributor[];
}
export interface Setting {
    lang: string;
}
export const enum MessageType {
    Success,
    Error,
    Info,
    Warning,
    Loading
}
export interface Message {
    type: MessageType;
    intlId: string;
    content?: string;
}
/** Biz **/
export interface Contributor {
    name: string;
    avatar: Avatar
}
export interface Avatar {
    url: string
}