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
    nodePage: NodePage;
    namespacePage: NamespacePage;
    podPage: PodPage;
    deploymentPage: DeploymentPage;
    servicePage: ServicePage;
    gatewayPage: GatewayPage;
    logBookPage: LogBookPage;
    serviceAccountPage: ServiceAccountPage;
    secretPage: SecretPage;
    virtualServicePage: VirtualServicePage;
    destinationRulePage: DestinationRulePage;
    serviceEntryPage: ServiceEntryPage;
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
    namespaces: Namespace[];
}
export interface LandingPage {
    componentStatuses: ComponentStatus[];
}
export interface SettingPage {
    lang: string;
    isFewBoxDelivery: boolean;
    isHelp: boolean;
}
export interface NodePage {
    nodes: Node[];
}
export interface NamespacePage {
    namespaces: Namespace[];
}
export interface ServicePage {
    services: Service[];
}
export interface PodPage {
    pods: Pod[];
    serviceAccounts: ServiceAccount[];
}
export interface DeploymentPage {
    deployments: Deployment[];
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
}
export interface GatewayPage {
    gateways: Gateway[];
}
export interface LogBookPage {
    logBook: LogBook;
}
export interface ServiceAccountPage {
    serviceAccounts: ServiceAccount[];
}
export interface SecretPage {
    secrets: Secret[];
}
export interface VirtualServicePage {
    virtualServices: VirtualService[];
    gateways: Gateway[];
    services: Service[];
    deployments: Deployment[];
}
export interface DestinationRulePage {
    selectedDestinationRule: SelectedDestinationRule;
    destinationRules: DestinationRule[];
    services: Service[];
    deployments: Deployment[];
}
export interface ServiceEntryPage {
    serviceEntries: ServiceEntry[];
}
/** Biz **/
export interface ComponentStatus {
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
export interface Node {
    name: string;
    cpu: string;
    hd: string;
    memory: string;
    pods: string;
    allocatableCPU: string;
    allocatableHD: string;
    allocatableMemory: string;
    allocatablePods: string;
    podCIDR: string;
    ip: string;
    hostname: string;
    os: string;
    containerRuntime: string;
    kubelet: string;
    kubeProxy: string;
    images: Cargo[];
    age: string;
}
export interface Cargo {
    names: string[];
    size: string;
}
export interface Namespace {
    name: string;
    isIstioInjected: boolean;
    description: string;
    status: string;
    age: string;
}
export interface Pod {
    namespace: string;
    name: string;
    serviceAccount: string;
    containers: string[];
    volumns: any[];
    volumnMounts: DocumentDefinition[];
    app: string;
    version: string;
    status: string;
    node: string;
    nodeIP: string;
    ip: string;
    age: string;
}
export interface Deployment {
    namespace: string;
    name: string;
    version: string;
    serviceAccount: string;
    app: string;
    replias: number;
    images: string[];
    volumns: any[];
    volumnMounts: DocumentDefinition[];
    age: string;
}
export interface Service {
    namespace: string;
    name: string;
    selector: string;
    clusterIP: string;
    type: string;
    ports: ContainerPort[];
    sessionAffinity: string;
    age: string;
}
export interface ContainerPort {
    name: string;
    port: number;
    targetPort: number;
}
export interface Gateway {
    namespace: string;
    name: string;
    age: string;
}
export interface VirtualService {
    namespace: string;
    name: string;
    hosts: string[];
    gateways: string[];
    https: Http[];
    age: string;
}
export interface Http {
    uris: any[];
    headers: any[];
    routes: Route[];
}
export interface Route {
    host: string;
    subset: string;
    port: string;
}
export interface LogBook {
    content: string;
}
export interface ServiceAccount {
    namespace: string;
    name: string;
    secrets: Secret[];
    age: string;
}
export interface Secret {
    namespace: string;
    name: string;
    type: string;
    datas: any[];
    age: string;
}
export interface DocumentDefinition {
    name: string;
    mountPath: string;
    mountSubPath: string;
    isReadOnly: boolean;
}
export interface SelectedDestinationRule {
    subsets: Subset[];
    deployments: Deployment[];
}
export interface DestinationRule {
    namespace: string;
    name: string;
    host: string;
    tlsMode: string;
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
export interface ServiceEntry {
    namespace: string;
    name: string;
    hosts: string[];
    addresses: string[];
    ports: Port[];
    age: string;
}
export interface Port {
    name: string;
    number: string;
    protocol: string;
}
/* UI */
export interface Option {
    name: string;
    value: string;
}