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
    countryPage: CountryPage;
    shippingLinePage: ShippingLinePage;
    containerShipPage: ContainerShipPage;
    shipyardPage: ShipyardPage;
    quayAreaPage: QuayAreaPage;
    gateAreaPage: GateAreaPage;
    logBookPage: LogBookPage;
    captainPage: CaptainPage;
    credentialPage: CredentialPage;
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
    isMessageVisible: boolean;
    isLoadingVisible: boolean;
    isDrawerVisible: boolean;
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
export interface CountryPage {
    countries: Country[];
}
export interface ShippingLinePage {
    shippingLines: ShippingLine[];
}
export interface QuayAreaPage {
    quayAreas: QuayArea[];
    berthComponents: BerthComponent[];
}
export interface ContainerShipPage {
    containerShips: ContainerShip[];
}
export interface ShipyardPage {
    shipyards: Shipyard[];
}
export interface GateAreaPage {
    gateAreas: GateArea[];
    channelComponents: ChannelComponent[];
}
export interface LogBookPage {
    logBook: LogBook;
}
export interface CaptainPage {
    captains: Captain[];
}
export interface CredentialPage {
    credentials: Credential[];
    stampComponents: StampComponent[];
}

/** Biz **/
export interface Contributor {
    name: string;
    avatar: Avatar
}
export interface Avatar {
    url: string
}
export interface Country {
    name: string;
    horsepower: string;
    displacement: string;
    cube: string;
    tonnage: string;
    allocatableHorsepower: string;
    allocatableDisplacement: string;
    allocatableCube: string;
    allocatableTonnage: string;
    containerShipPositionZone: string;
    position: string;
    alias: string;
    government: string;
    constitution: string;
    industry: string;
    transportation: string;
    cargos: Cargo[];
    age: string;
}
export interface Cargo {
    names: string[];
    size: string;
}
export interface ShippingLine {
    name: string;
    isIstioInjected: boolean;
    description: string;
    status: string;
    age: string;
}
export interface ContainerShip {
    shippingLine: string;
    name: string;
    captain: string;
    containers: string[];
    manifests: any[];
    description: string;
    status: string;
    country: string;
    countryPosition: string;
    position: string;
    age: string;
}
export interface Shipyard {
    shippingLine: string;
    name: string;
    numbering: string;
    captain: string;
    description: string;
    quantity: number;
    cargos: string[];
    age: string;
}
export interface QuayArea {
    shippingLine: string;
    name: string;
    containerShipSpec: string;
    position: string;
    type: string;
    mooringBitt: string;
    berthes: Berth[];
    age: string;
}
export interface Berth {
    name: string;
    crane: string;
    cellGuide: string;
}
export interface GateArea {
    shippingLine: string;
    name: string;
}
export interface LogBook {
    content: string;
}
export interface Captain {
    shippingLine: string;
    name: string;
    credentials: Credential[];
    age: string;
}
export interface Credential {
    shippingLine: string;
    name: string;
    type: string;
    stamps: any[];
    age: string;
}
/** UI **/
export interface BerthComponent {
    name: string;
}
export interface ChannelComponent {
    name: string;
}
export interface StampComponent {
    name: string;
}