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
    shippingLanePage: ShippingLanePage;
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
export interface ShippingLanePage {
    shippingLanes: ShippingLane[];
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
export interface ShippingLane {
    name: string;
    isIstioInjected: boolean;
    labels: string;
}
export interface ContainerShip{
    namespace: string;
    name: string;
    containers: Container[];
    labels: string;
}
export interface Container{
    name: string;
}