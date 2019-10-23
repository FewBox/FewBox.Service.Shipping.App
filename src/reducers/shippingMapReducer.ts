import ActionTypes from '../actions/ActionTypes';
import { ShippingMapPage } from './State';

const shippingMapPage = {
    shippingLanes: [
        { name: 'cURL', description: 'cURL is a command line tool that allows you to transfer data to or from the internet and should not be confused with Wget.', logo: 'https://cn.bing.com/th?id=OIP.NaNuk8p25vswhZh-EoUdRQHaD7&pid=Api&rs=1' },
        { name: 'bombardier', description: 'bombardier is a HTTP(S) benchmarking tool. ', logo: 'http://www.scarbrough-intl.com/wp-content/uploads/2016/12/Transport2maersk.png' },
    ],
    isListLoading: false
};
export default (state: ShippingMapPage = shippingMapPage, action: any): ShippingMapPage => {
    switch (action.type) {
        default:
            return state;
    }
}