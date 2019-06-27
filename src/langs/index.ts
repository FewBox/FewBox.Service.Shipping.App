import * as _ from 'lodash';
import en_us from './en-us';
import zh_cn from './zh-cn';

export default (lang: string) => {
    if (_.isEmpty(lang)) {
        switch (navigator.language.split('_')[0]) {
            case 'en':
                return en_us;
            case 'zh':
                return zh_cn;
            default:
                return zh_cn;
        }
    }
    else {
        switch (lang) {
            case 'en-us':
                return en_us;
            default:
                return zh_cn;
        }
    }
};