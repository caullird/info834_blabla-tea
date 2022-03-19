var session = require('express-session');
var config = require('../config');

/**
 * Initialize Session
 * Uses MongoDB-based session store
 *
 */
var init = function () {
    return session({
        secret: config.sessionSecret,
        resave: false,
        unset: 'destroy',
        saveUninitialized: true
    });
}

module.exports = init();