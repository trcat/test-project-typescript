import AjaxHelper from '@/helper/ajax-helper';
import { TestScoreResultData } from '@/data';

export default class API {
    public static submitAnswer(
        userId: string,
        testId: string,
        answer: {[key: string]: string[]} ,
        callback: (r: TestScoreResultData) => void) {
        const data = {
            id: testId,
            user_id: userId,
            user_answer: answer,
        };
        AjaxHelper.ajax({
            url: '/operation/finish/',
            type: 'post',
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: 'application/json;charset=utf-8',
        });
    }
}
