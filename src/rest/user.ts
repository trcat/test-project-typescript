import AjaxHelper from './ajax-helper';
import { ResultObj } from './data';

export default class API {
    public static loginOut(id: string, callback: (data: ResultObj) => void) {
        AjaxHelper.ajax({
            url: `/user/loginOut/${id}/`,
            type: 'delete',
            async: true,
            success: callback,
        });
    }
}
