import AjaxHelper from '@/helper/ajax-helper';
import { UserData, UserResultData, ClassListResultData } from '@/data';

export default class API {
    public static getClassOptions(callback: (r: ClassListResultData) => void) {
        AjaxHelper.ajax({
            url: '/user/class/',
            type: 'get',
            async: true,
            success: callback,
        });
    }
    public static createAccount(data: UserData, callback: (r: UserResultData) => void) {
        AjaxHelper.ajax({
            url: '/user/userInfo/',
            type: 'post',
            data,
            async: true,
            success: callback,
        });
    }
}
