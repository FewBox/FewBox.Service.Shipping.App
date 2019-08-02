import { MessageType } from "@fewbox/react-components";

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
    fleetPage: FleetPage;
    customPage: CustomPage;
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
    shippingLines: ShippingLine[];
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
export interface FleetPage {
    fleets: Fleet[];
    ownerShipItemComponents: OwnerShipItemComponent[]
}
export interface ContainerShipPage {
    containerShips: ContainerShip[];
}
export interface ShipyardPage {
    shipyards: Shipyard[];
}
export interface CustomPage{
    customs: Custom[];
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
export interface ContainerShip {
    shippingLine: string;
    name: string;
    containers: Container[];
    description: string;
    condition: string;
}
export interface Container {
    name: string;
}
export interface Shipyard {
    shippingLine: string;
    name: string;
    description: string;
    quantity: number;
}
export interface Fleet {
    shippingLine: string;
    name: string;
}
export interface Custom{
    shippingLine: string;
    name: string;
}
/** UI **/
export interface OwnerShipItemComponent {
    name: string;
}