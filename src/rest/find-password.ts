import AjaxHelper from './ajax-helper';
import { ReturnObj } from './data';

export interface FindPwdData extends ReturnObj {
    data: string;
}

export default class API {
    public static getModifyPasswordData(id: string, email: string, callback: (data: FindPwdData) => void) {
        const data = {id, email};
        const url = `/user/findPwd/${id}/`;
        const ajaxObject = {
            url,
            type: 'get',
            data,
            async: true,
            success: callback,
        };
        AjaxHelper.ajax(ajaxObject);
    }
}
