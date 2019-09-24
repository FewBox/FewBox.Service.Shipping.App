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
    yardAreaPage: YardAreaPage;
    stackPolicyPage: StackPolicyPage;
    freeTradeAreaPage: FreeTradeAreaPage;
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
    drawer: any;
    path?: string;
    shippingLines: ShippingLine[];
}
export interface LandingPage {
    shippingIndustryStatuses: ShippingIndustryStatus[];
}
export interface SettingPage {
    lang: string;
    isFewBoxDelivery: boolean;
    isHelp: boolean;
}
export interface CountryPage {
    countries: Country[];
}
export interface ShippingLinePage {
    shippingLines: ShippingLine[];
}
export interface QuayAreaPage {
    quayAreas: QuayArea[];
}
export interface ContainerShipPage {
    containerShips: ContainerShip[];
    captains: Captain[];
}
export interface ShipyardPage {
    shipyards: Shipyard[];
    captains: Captain[];
    credentials: Credential[];
}
export interface GateAreaPage {
    gateAreas: GateArea[];
}
export interface LogBookPage {
    logBook: LogBook;
}
export interface CaptainPage {
    captains: Captain[];
}
export interface CredentialPage {
    credentials: Credential[];
}
export interface YardAreaPage {
    yardAreas: YardArea[];
    gateAreas: GateArea[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
}
export interface StackPolicyPage {
    selectedStackPolicy: SelectedStackPolicy;
    stackPolicies: StackPolicy[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
}
export interface FreeTradeAreaPage {
    freeTradeAreas: FreeTradeArea[];
}
/** Biz **/
export interface ShippingIndustryStatus {
    name: string;
    conditions: Condition[];
}
export interface Condition {
    type: string;
    status: string;
    message: string;
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
    documents: any[];
    documentDefinitions: DocumentDefinition[];
    identificationCode: string;
    numbering: string;
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
    identificationCode: string;
    quantity: number;
    cargos: string[];
    documents: any[];
    documentDefinitions: DocumentDefinition[];
    age: string;
}
export interface QuayArea {
    shippingLine: string;
    name: string;
    containerShipSpec: string;
    position: string;
    type: string;
    berthes: Berth[];
    containerShipAgreementType: string;
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
    age: string;
}
export interface YardArea {
    shippingLine: string;
    name: string;
    aliases: string[];
    gateAreas: string[];
    guideboards: Guideboard[];
    age: string;
}
export interface Guideboard {
    targets: any[];
    tagTargets: any[];
    directions: Direction[];
}
export interface Direction {
    quayArea: string;
    crane: string;
    numbering: string;
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
export interface DocumentDefinition {
    name: string;
    term: string;
    subTerm: string;
    isWaterMarked: boolean;
}
export interface SelectedStackPolicy {
    subsets: Subset[];
    shipyards: Shipyard[];
}
export interface StackPolicy {
    shippingLine: string;
    name: string;
    alias: string;
    mode: string;
    subsets: Subset[];
    age: string;
}
export interface Subset {
    name: string;
    labels: LabelBag;
}
export interface LabelBag {
    version: string;
}
export interface FreeTradeArea {
    shippingLine: string;
    name: string;
    aliases: string[];
    positions: string[];
    passes: Pass[];
    age: string;
}
export interface Pass {
    name: string;
    number: string;
    protocol: string;
}
/* UI */
export interface Option{
    name: string;
    value: string;
}