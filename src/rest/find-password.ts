import AjaxHelper from './ajax-helper';
import { ReturnData } from './data';

export interface FindPwdData extends ReturnData {
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
