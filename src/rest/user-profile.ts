import AjaxHelper from './ajax-helper';
import { UserData, ReturnData } from './data';

export interface ResultData extends ReturnData  {
    data: UserData;
}

export default class API {
    public static saveProfile(data: UserData, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: 'put',
            data,
            async: true,
            success: callback,
        });
    }
    public static savePassword(data: UserData, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: 'put',
            data,
            async: true,
            success: callback,
        });
    }
}
