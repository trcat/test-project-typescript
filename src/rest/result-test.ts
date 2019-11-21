import AjaxHelper from '@/helper/ajax-helper';
import { UserData, TestListResultData, StudentScoreResultData, ClassScorePageListResultData } from '@/data';

export default class API {
    public static getTestList(
        user: UserData,
        callback: (r: TestListResultData) => void,
        limit: number,
        offset: number) {
        const ajaxObj = {
            url: `/operation/finish/?id=${user.id}`,
            type: 'get',
            async: true,
            success: callback,
        };

        if (user.identity === 'teacher') {
            ajaxObj.url = '/paper/papers/';
            Reflect.set(ajaxObj, 'data', {limit, offset});
        }

        AjaxHelper.ajax(ajaxObj);
    }
    public static getTestResult(
        user: UserData,
        testId: string,
        callback: (r: ClassScorePageListResultData | StudentScoreResultData) => void) {
        const ajaxObj = {
            url: `/operation/classScore/`,
            type: 'get',
            async: true,
            success: callback,
            data: {
                id: testId,
            },
        };

        if (user.identity === 'student') {
            ajaxObj.url = `/operation/getResult/`;
            ajaxObj.data = {
                id: testId,
            };
            Reflect.set(ajaxObj.data, 'user_id', user.id);
        }

        AjaxHelper.ajax(ajaxObj);
    }
}
