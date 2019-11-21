import AjaxHelper from '@/helper/ajax-helper';
import { TestListResultData, ResultData, TestData, DispatchData, DispatchResultData, QuestionPageListResultData } from '@/data';

export default class API {
    public static getTestList(limit: number, offset: number, callback: (r: TestListResultData) => void) {
        AjaxHelper.ajax({
            url: '/paper/paperLibs/',
            type: 'get',
            data: {
                limit,
                offset,
            },
            async: true,
            success: callback,
        });
    }
    public static deleteTest(id: string, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${id}/`,
            type: 'delete',
            async: true,
            success: callback,
        });
    }
    public static saveTest(data: TestData, callback: (r: ResultData) => void) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${data.id}/`,
            type: 'put',
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: 'application/json;charset=utf-8',
        });
    }
    public static dispatchTest(data: DispatchData, callback: (r: DispatchResultData) => void) {
        AjaxHelper.ajax({
            url: '/paper/papers/',
            type: 'post',
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: 'application/json;charset=utf-8',
        });
    }
    public static getQuestionsById(id: string, callback: (r: QuestionPageListResultData) => void) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${id}/`,
            type: 'get',
            async: true,
            success: callback,
        });
    }
}
