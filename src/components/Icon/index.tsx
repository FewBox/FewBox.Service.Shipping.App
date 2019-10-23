import * as React from 'react';
import { Icon } from 'antd';
import ShippingLineSvg from '../../../assets/images/shippingline.svg';
import QuayAreaSvg from '../../../assets/images/quayarea.svg';
import ShipyardSvg from '../../../assets/images/shipyard.svg';
import ContainerShipSvg from '../../../assets/images/containership.svg';
import GateAreaSvg from '../../../assets/images/gatearea.svg';
import CargoPackagePolicySvg from '../../../assets/images/container.svg';
import LandingSvg from '../../../assets/images/landing.svg';
import BerthSvg from '../../../assets/images/berth.svg';
import CraneSvg from '../../../assets/images/crane.svg';
import CellGuideSvg from '../../../assets/images/cellguide.svg';
import ContainerSvg from '../../../assets/images/container.svg';
import DoorSvg from '../../../assets/images/door.svg';
import NumberingSvg from '../../../assets/images/numbering.svg';
import CountrySvg from '../../../assets/images/country.svg';
import ReefSvg from '../../../assets/images/reef.svg';
import CrashSvg from '../../../assets/images/crash.svg';
import IstioSvg from '../../../assets/images/istio.svg';
import BrandSvg from '../../../assets/images/brand.svg';
import CargoSvg from '../../../assets/images/cargo.svg';
import SleepSvg from '../../../assets/images/sleep.svg';
import CaptainSvg from '../../../assets/images/captain.svg';
import CredentialSvg from '../../../assets/images/credential.svg';
import ForkliftSvg from '../../../assets/images/forklift.svg';
import TrafficLightSvg from '../../../assets/images/traffic-light.svg';
import WarehouseSvg from '../../../assets/images/warehouse.svg';
import KubernetesSvg from '../../../assets/images/kubernetes.svg';
import ShippingLaneSvg from '../../../assets/images/shipping-lane.svg';
import ScheduleSvg from '../../../assets/images/schedule.svg';
import ShippingMapSvg from '../../../assets/images/shipping-map.svg';
import InstallSvg from '../../../assets/images/install.svg';

const fontSize = { fontSize: '20px' };
export const KubernetesIcon = props => <Icon style={fontSize} component={KubernetesSvg} {...props} />;
export const IstioIcon = props => <Icon style={fontSize} component={IstioSvg} {...props} />;
export const ShippingLaneIcon = props => <Icon style={fontSize} component={ShippingLaneSvg} {...props} />
export const ShippingMapIcon = props => <Icon style={fontSize} component={ShippingMapSvg} {...props} />
export const NamespaceIcon = props => <Icon style={fontSize} component={ShippingLineSvg} {...props} />;
export const ServiceIcon = props => <Icon style={fontSize} component={QuayAreaSvg} {...props} />;
export const DeploymentIcon = props => <Icon style={fontSize} component={ShipyardSvg} {...props} />;
export const PodIcon = props => <Icon style={fontSize} component={ContainerShipSvg} {...props} />;
export const GatewayIcon = props => <Icon style={fontSize} component={GateAreaSvg} {...props} />;
export const ImagePullPolicyIcon = props => <Icon style={fontSize} component={CargoPackagePolicySvg} {...props} />;
export const LandingIcon = props => <Icon style={fontSize} component={LandingSvg} {...props} />;
export const PortNameIcon = props => <Icon style={fontSize} component={BerthSvg} {...props} />;
export const PortIcon = props => <Icon style={fontSize} component={CraneSvg} {...props} />;
export const TargetIcon = props => <Icon style={fontSize} component={CellGuideSvg} {...props} />;
export const ContainerIcon = props => <Icon style={fontSize} component={ContainerSvg} {...props} />;
export const DoorIcon = props => <Icon style={fontSize} component={DoorSvg} {...props} />;
export const VersionIcon = props => <Icon style={fontSize} component={NumberingSvg} {...props} />;
export const NodeIcon = props => <Icon style={fontSize} component={CountrySvg} {...props} />;
export const BrandIcon = props => <Icon style={fontSize} component={BrandSvg} {...props} />;
export const ImageIcon = props => <Icon style={fontSize} component={CargoSvg} {...props} />;
export const SleepIcon = props => <Icon style={fontSize} component={SleepSvg} {...props} />;
export const ServiceAccountIcon = props => <Icon style={fontSize} component={CaptainSvg} {...props} />;
export const SecretIcon = props => <Icon style={fontSize} component={CredentialSvg} {...props} />;
export const ServiceEntryIcon = props => <Icon style={fontSize} component={WarehouseSvg} {...props} />
export const VirtualServiceIcon = props => <Icon style={fontSize} component={ForkliftSvg} {...props} />
export const DestinationRuleIcon = props => <Icon style={fontSize} component={TrafficLightSvg} {...props} />
export const JobIcon = props => <Icon style={fontSize} component={ScheduleSvg} {...props} />
export const InstallIcon = props => <Icon style={fontSize} component={InstallSvg} {...props} />
// None style
export const ReefIcon = props => <Icon component={ReefSvg} {...props} />;
export const CrashIcon = props => <Icon component={CrashSvg} {...props} />;