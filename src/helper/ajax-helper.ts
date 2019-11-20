import $ from 'jquery';
import 'jquery.cookie';


export default class AjaxHelper {
    public static ajax(ajaxObj: JQueryAjaxSettings) {
        const ajaxObject: JQueryAjaxSettings = {
            type: ajaxObj.type,
            url: ajaxObj.url,
            /**
             * @param {} data
             * @param {string} textStatus
             * @param {JQueryXHR} jqXHR
             */
            success(data, textStatus, jqXHR) {
                if (typeof ajaxObj.success === 'function') {
                    ajaxObj.success(data, textStatus, jqXHR);
                }
            },
            /**
             * @param {JQueryXHR} jqXHR
             * @param {string} textStatus
             * @param {string} errorThrown
             */
            error(jqXHR, textStatus, errorThrown) {
                if (typeof ajaxObj.error === 'function') {
                    ajaxObj.error(jqXHR, textStatus, errorThrown);
                }
            },
            dataType: 'json',
            async: ajaxObj.async || false,
        };

        if (ajaxObj.data) {
            ajaxObject.data = ajaxObj.data;
        }

        if (ajaxObj.contentType) {
            ajaxObject.contentType = ajaxObj.contentType;
        }

        if ($.cookie('token')) {
            const token = 'JWT ' + $.cookie('token');
            ajaxObject.headers = {
                Authorization: token,
            };
        }

        $.ajax(ajaxObject);
    }
}
