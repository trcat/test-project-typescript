import AjaxHelper from '@/helper/ajax-helper';
import { UserData, UserResultData } from '@/data';

export default class API {
    public static saveProfile(data: UserData, callback: (r: UserResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: 'put',
            data,
            async: true,
            success: callback,
        });
    }
    public static savePassword(data: UserData, callback: (r: UserResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: 'put',
            data,
            async: true,
            success: callback,
        });
    }
}
