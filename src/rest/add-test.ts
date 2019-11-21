import AjaxHelper from '@/helper/ajax-helper';
import { TestData, CreateTestResultData } from '@/data';

export default class API {
    public static createTest(data: TestData, callback: (r: CreateTestResultData) => void) {
        AjaxHelper.ajax({
            url: 'paper/paperLibs/',
            type: 'post',
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: 'application/json;charset=utf-8',
        });
    }
}
