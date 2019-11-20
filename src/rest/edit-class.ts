import AjaxHelper from '@/helper/ajax-helper';
import { ClassListResultData, ClassResultData, ResultData, MemberPageListReturnData } from '@/data';

type getClassMembersCallback = (r: MemberPageListReturnData) => void;

export default class API {
    public static searchClass(className: string, callback: (r: ClassListResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/class/?search=${className}`,
            type: 'get',
            async: true,
            success: callback,
        });
    }
    public static saveClass(classId: string, className: string, callback: (r: ClassResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/class/${classId}/`,
            type: 'put',
            data: className,
            async: true,
            success: callback,
        });
    }
    public static deleteClass(classId: string, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/user/class/${classId}/`,
            type: 'delete',
            async: true,
            success: callback,
        });
    }
    public static getClassMembers(classId: string, limit: number, offset: number, callback: getClassMembersCallback) {
        AjaxHelper.ajax({
            url: `/user/studentInClass/${classId}/`,
            type: 'get',
            data: {
                my_class: classId,
                limit,
                offset,
            },
            async: true,
            success: callback,
        });
    }
}
