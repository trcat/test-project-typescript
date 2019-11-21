import AjaxHelper from '@/helper/ajax-helper';
import { ViewResultData } from '@/data';

export default class API {
    public static getTestList(callback: (r: ViewResultData) => void) {
        AjaxHelper.ajax({
            url: '/paper/getReady/',
            type: 'get',
            async: true,
            success: callback,
        });
    }
}
