'use strict';

/*global module, browser */

module.exports = {
    urlChanged: urlChanged
};

function urlChanged(url) {
    return function () {
        return browser.getCurrentUrl().then(function(actualUrl) {
            return url !== actualUrl;
        });
    };
};
