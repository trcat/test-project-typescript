import AjaxHelper from '@/helper/ajax-helper';
import { ResultData } from '@/data';

export default class API {
    public static loginOut(id: string, callback: (data: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/loginOut/${id}/`,
            type: 'delete',
            async: true,
            success: callback,
        });
    }
}
