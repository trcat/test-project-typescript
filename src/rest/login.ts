import AjaxHelper from '@/helper/ajax-helper';
import { ReturnData, UserData } from '@/data';


interface BaseLoginData {
    password: string;
}

interface IdLoginData extends BaseLoginData {
    id: string;
}

interface EmailLoginData extends BaseLoginData {
    email: string;
}

export interface TokenData extends ReturnData {
    token: string;
    data: UserData;
}

export default class API {
    public static loginByAccount(id: string, password: string, callback: (data: TokenData) => void) {
        const data = {id, password};
        API.login(data, callback);
    }
    public static loginByEmail(email: string, password: string, callback: (data: TokenData) => void) {
        const data = {email, password};
        API.login(data, callback);
    }
    private static login(data: IdLoginData | EmailLoginData, callback: (data: TokenData) => void) {
        const ajaxObject = {
            url: '/user/login/',
            type: 'post',
            data,
            async: true,
            success: callback,
        };
        AjaxHelper.ajax(ajaxObject);
    }
}
