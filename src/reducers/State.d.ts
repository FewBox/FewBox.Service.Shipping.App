import { MessageType } from "@fewbox/react-components";
import { RegistryType } from "./RegistryType";
import { ImagePullPolicyType } from "./ImagePullPolicyType";

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
    jobPage: JobPage;
    shippingMapPage: ShippingMapPage;
}
/** UI **/
export interface ResourcePage<T> {
    items: T[];
    isListLoading: boolean;
}
export interface SignInPage {
    isUsernameAndPasswordValid: boolean;
    isSignInButtonLoading: boolean;
}
export interface MasterPage {
    messageType: MessageType;
    messageIntlId: string;
    messageValues?: any;
    messageDuration?: number;
    isMessageVisible: boolean;
    isLoadingVisible: boolean;
    isDrawerVisible: boolean;
    isLockWindowVisible: boolean;
    drawer: any;
    path?: string;
    namespaces: Namespace[];
}
export interface LandingPage {
    componentStatuses: ComponentStatus[];
    apiVersions: ApiVersions;
    healthz: Healthz;
    healthzAutoRegisterCompletion: Healthz;
    healthzEtcd: Healthz;
    healthzLog: Healthz;
    healthzPing: Healthz;
    healthzPoststarthook_ApiserviceOpenapiController: Healthz;
    healthzPoststarthook_ApiserviceRegistrationController: Healthz;
    healthzPoststarthook_ApiserviceStatusAvailableController: Healthz;
    healthzPoststarthook_BootstrapController: Healthz;
    healthzPoststarthook_CARegistration: Healthz;
    healthzPoststarthook_GenericApiserverStartInformers: Healthz;
    healthzPoststarthook_KubeApiserverAutoregistration: Healthz;
    healthzPoststarthook_Rbac_BootstrapRoles: Healthz;
    healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: Healthz;
    healthzPoststarthook_StartApiextensionsControllers: Healthz;
    healthzPoststarthook_StartApiextensionsInformers: Healthz;
    healthzPoststarthook_StartKubeAggregatorInformers: Healthz;
    healthzPoststarthook_StartKubeApiserverAdmissionInitializer: Healthz;
    isDashboardLoading: boolean;
}
export interface ShippingMapPage {
    shippingLanes: ShippingLane[];
    isListLoading: boolean;
}
export interface SettingPage {
    lang: string;
    isFewBoxDelivery: boolean;
    isHelp: boolean;
}
export interface NodePage extends ResourcePage<Node> {
}
export interface NamespacePage extends ResourcePage<Namespace> {
}
export interface ServicePage extends ResourcePage<Service> {
}
export interface PodPage extends ResourcePage<Pod> {
    serviceAccounts: ServiceAccount[];
}
export interface DeploymentPage extends ResourcePage<Deployment> {
    selectedDeployment: SelectedDeployment;
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
    registryType: RegistryType;
    images?: string[];
    versions?: string[];
}
export interface GatewayPage extends ResourcePage<Gateway> {
}
export interface LogBookPage {
    logBook: LogBook;
}
export interface ServiceAccountPage extends ResourcePage<ServiceAccount> {
}
export interface SecretPage extends ResourcePage<Secret> {
    selectedSecret: SelectedSecret;
}
export interface VirtualServicePage extends ResourcePage<VirtualService> {
    selectedVirtualService: SelectedVirtualService;
    gateways: Gateway[];
    services: Service[];
    serviceDeploymentses: ServiceDeployments[];
}
export interface DestinationRulePage extends ResourcePage<DestinationRule> {
    selectedDestinationRule: SelectedDestinationRule;
    services: Service[];
    deployments: Deployment[];
}
export interface ServiceEntryPage extends ResourcePage<ServiceEntry> {
}
export interface JobPage extends ResourcePage<Job> {
}
/** Biz **/
export interface ServiceDeployments {
    service: string;
    deployments: Deployment[];
}
export interface Healthz {
    content: string;
}
export interface ComponentStatus {
    name: string;
    conditions: Condition[];
}
export interface ApiVersions {
    versions: string[];
    serverAddressByClientCIDRs: ServerAddressByClientCIDR[];
}
export interface ServerAddressByClientCIDR {
    clientCIDR: string;
    serverAddress: string;
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
    images: Image[];
    age: string;
}
export interface Image {
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
export interface ShippingLane {
    name: string;
    description: string;
    logo: string;
}
export interface Pod {
    namespace: string;
    name: string;
    serviceAccount: string;
    containers: string[];
    volumes: any[];
    volumeMounts: VolumeMount[];
    app: string;
    version: string;
    phase: string;
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
    replicas: number;
    images: string[];
    volumes: any[];
    containers: Container[];
    age: string;
}
export interface Container {
    name: string;
    image: string;
    imagePullPolicyType: ImagePullPolicyType;
    containerPorts: ContainerPort[];
    volumeMounts: VolumeMount[];
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
    rewrite: Rewrite;
    routes: Route[];
}
export interface Rewrite {
    uri: string;
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
export interface VolumeMount {
    name: string;
    mountPath: string;
    mountSubPath: string;
    isReadOnly: boolean;
}
export interface SelectedDeployment {
    images: string[];
}
export interface SelectedDestinationRule {
    subsets: Subset[];
    deployments: Deployment[];
}
export interface SelectedVirtualService {
    allServices: Service[];
    allGateways: Gateway[];
    serviceDeploymentses: ServiceDeployments[]
    hosts: string[];
    gateways: string[];
    https: Http[];
}
export interface SelectedSecret {
    datas: any[];
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
export interface Job {
    namespace: string;
    name: string;
}
/* UI */
export interface Option {
    name: string;
    value: string;
}