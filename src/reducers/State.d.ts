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
    signinPage: SignInPage;
    masterPage: MasterPage;
    landingPage: LandingPage;
    settingPage: SettingPage;
    shippingLinePage: ShippingLinePage;
    containerShipPage: ContainerShipPage;
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
export interface ShippingLinePage {
    shippingLines: ShippingLine[];
}
export interface ContainerShipPage{
    containerShips: ContainerShip[];
}

/** Biz **/
export interface Contributor {
    name: string;
    avatar: Avatar
}
export interface Avatar {
    url: string
}
export interface ShippingLine {
    name: string;
    isIstioInjected: boolean;
    description: string;
}
export interface ContainerShip{
    shippingLine: string;
    name: string;
    containers: Container[];
    description: string;
}
export interface Container{
    name: string;
}