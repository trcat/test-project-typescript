import AjaxHelper from './ajax-helper';
import { ReturnObj } from './data';

export interface ResultData extends ReturnObj {
    data: null;
}

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
