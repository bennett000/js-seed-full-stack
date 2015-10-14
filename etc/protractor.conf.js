'use strict';
/*global module */

var localSelenium = '../node_modules/protractor/selenium/' +
    /**
     * Please make sure the string below this is adjusted to reflect the
     * version found in `node_modules/protractor/selenium`
     */
    'selenium-server-standalone-2.47.1.jar';

module.exports.config = {
    // The address of a running selenium server.
    seleniumServerJar: localSelenium, // Make use you check the version
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};