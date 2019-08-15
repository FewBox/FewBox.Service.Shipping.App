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
    containerTerminalPage: ContainerTerminalPage;
    customsPage: CustomsPage;
    logBookPage: LogBookPage;
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
export interface ContainerTerminalPage {
    containerTerminals: ContainerTerminal[];
    berthComponents: BerthComponent[];
}
export interface ContainerShipPage {
    containerShips: ContainerShip[];
}
export interface ShipyardPage {
    shipyards: Shipyard[];
}
export interface CustomsPage{
    customs: Customs[];
    berthComponents: BerthComponent[];
}
export interface LogBookPage{
    logBook: LogBook;
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
    fleetName: string;
    fleetAddress: string;
    address: string;
}
export interface Container {
    name: string;
}
export interface Shipyard {
    shippingLine: string;
    name: string;
    description: string;
    quantity: number;
    cargos: string[];
}
export interface ContainerTerminal {
    shippingLine: string;
    name: string;
    containerShipSpec: string;
}
export interface Customs{
    shippingLine: string;
    name: string;
}
export interface LogBook{
    content: string;
}
/** UI **/
export interface BerthComponent {
    name: string;
}