import AjaxHelper from '@/helper/ajax-helper';
import { ResultData } from '@/data';

export default class API {
    public static modifyPassword(data: string, callback: (data: ResultData) => void) {
        const ajaxObject = {
            url: `/user/resetPwd/?token=${data}`,
            type: 'get',
            success: callback,
            async: true,
        };
        AjaxHelper.ajax(ajaxObject);
    }
}
