import AjaxHelper from '@/helper/ajax-helper';
import { UserResultData, ResultData } from '@/data';

export default class API {
    public static searchUser(id: string, callback: (r: UserResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${id}/`,
            type: 'get',
            async: true,
            success: callback,
        });
    }
    public static deleteProfile(id: string, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${id}/`,
            type: 'delete',
            async: true,
            success: callback,
        });
    }
}
