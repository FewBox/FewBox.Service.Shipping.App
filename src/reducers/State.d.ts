import { MessageType } from "fewbox-react-components";

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
    signin: SignInPage;
    master: MasterPage;
    landing: LandingPage;
    setting: SettingPage;
    shippingLane: ShippingLanePage;
}
/** UI **/
export interface SignInPage {
    isUsernameAndPasswordValid: boolean;
}
export interface MasterPage {
    messageType: MessageType;
    messageIntlId: string;
    messageValues?: any;
    messageDuration?: number;
    messageIsVisible: boolean;
    loadingIsVisible: boolean;
    path?: string;
}
export interface LandingPage {
    contributors: Contributor[];
}
export interface SettingPage {
    lang: string;
}
export interface ShippingLanePage {
    shippingLanes: ShippingLane[];
}

/** Biz **/
export interface Contributor {
    name: string;
    avatar: Avatar
}
export interface Avatar {
    url: string
}
export interface ShippingLane {
    name: string;
    isIstioInjected: boolean;
    labels: string;
}