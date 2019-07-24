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
    shipyardPage: ShipyardPage;
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
    isFewBoxDelivery: boolean;
}
export interface ShippingLinePage {
    shippingLines: ShippingLine[];
}
export interface ContainerShipPage{
    containerShips: ContainerShip[];
}
export interface ShipyardPage{
    shipyards: Shipyard[];
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
    condition: string;
}
export interface ContainerShip{
    shippingLine: string;
    name: string;
    containers: Container[];
    description: string;
    condition: string;
}
export interface Container{
    name: string;
}
export interface Shipyard{
    name: string;
    description: string;
    quantity: number;
}