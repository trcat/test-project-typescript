import AjaxHelper from './ajax-helper';
import { ResultObj } from './data';

export default class API {
    public static modifyPassword(data: string, callback: (data: ResultObj) => void) {
        const ajaxObject = {
            url: `/user/resetPwd/?token=${data}`,
            type: 'get',
            success: callback,
            async: true,
        };
        AjaxHelper.ajax(ajaxObject);
    }
}
