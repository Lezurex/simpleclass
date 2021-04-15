/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/15/21, 5:05 PM
 */
import {Notification} from "@/utils/Notification";

export default class RequestExecutor {
    /**
     * Builds an {@link XMLHttpRequest} ready to use for an API request.
     * @param path {String} Path in the API (HOST/api/ is already given)
     * @param method {String} HTTP request method to use (GET, POST, PATCH, DELETE, etc)
     * @returns {XMLHttpRequest}
     */
    buildXHR(path, method) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, window.location.origin + "/api/" + path);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener("load", ev => {
            switch (xhr.status) {
                case 429:
                    new Notification(global.i18n.global.t("errors.429-title"), global.i18n.global.t("errors.429-desc"), Notification.TYPE.error);
                    break;
                case 500:
                    new Notification(global.i18n.global.t("errors.500-title"), global.i18n.global.t("errors.500-desc"), Notification.TYPE.error)
            }
        });
        xhr.addEventListener("error", ev => {
            new Notification(global.i18n.global.t("errors.no-connection-title"), global.i18n.global.t("errors.no-connection-desc"), Notification.TYPE.error);
        })
        return xhr;
    }

    isSuccessful(statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }
}