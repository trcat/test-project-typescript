import AjaxHelper from '@/helper/ajax-helper';
import { ClassResultData } from '@/data';

export default class API {
    public static createClass(className: string, callback: (r: ClassResultData) => void) {
        const data = {
            id: null,
            class_name: className,
        };

        AjaxHelper.ajax({
            url: '/user/class/',
            type: 'post',
            data,
            async: true,
            success: callback,
        });
    }
}
