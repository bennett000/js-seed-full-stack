'use strict';

/*global require, module*/

var users = Object.create(null),
    config = require('../../../etc/config'),
    passwords = require('./passwords'),
    authorities = require('./authorities'),
    auth = require('./authorization'),
    hash = require('jshashes'),
    Q = require('q');

module.exports = {
    find: find,
    create: createUser,
    endpoints: {
        update: updateUserEndpoint,
        create: createUserEndpoint,
        password: changePassword,
        get: getUser,
        getAll: getAllUsers
    }
};

init();

function init() {
    if (Object.keys(users).length === 0) {
        createUser({
            id: 'root',
            authority: authorities.ADM,
            password: new hash.SHA256().b64('password'),
            expectedCalories: config.defaultCaloriesPerDay
        });
    }
}

/**
 * @param {{ id: string, password: string }} user
 * @returns {*}
 */
function validateCreateUser(user) {
    var d = Q.defer();
    if (!user || !user.id) {
        d.reject(new TypeError('createUser: Invalid User Id'));
        return d.promise;
    }
    if (!user.password) {
        d.reject(new TypeError('createUser: Invalid User Password'));
        return d.promise;
    }
    if (users[user.id]) {
        d.reject(new Error('createUser: User Exists'));
        return d.promise;
    }
    return null;
}

/**
 * @param {{ id: string, password: string, authority: authority,
 expectedCalories: number }} user
 * @returns {Q.Promise}
 */
function createUser(user) {
    var d = validateCreateUser(user);
    if (d) {
        // if validation returns a promise it's invalid
        return d;
    } else {
        d = Q.defer();
    }
    Q.all([
        passwords.create(user.id, user.password),
        authorities.create(user.id, user.authority)
    ]).then(function (results) {
     // kill off the password attribute
        delete user.password;
        // create a _new_ user object
        users[user.id] = {
            id: user.id,
            authority: results[1].authority,
            expectedCalories: user.expectedCalories ||
            config.defaultCaloriesPerDay
        };
        d.resolve(users[user.id]);
    });
    return d.promise;
}

/**
 * @param {string} id
 * @returns {Q.Promise}
 */
function find(id) {
    var d = Q.defer();
    authorities.find(id).then(function (auth) {
        if (users[id]) {
            users[id].authority = auth.authority;
            d.resolve(users[id]);
        } else {
            d.reject(new Error('findUser: user not found'));
        }
    }, d.reject);
    return d.promise;
}

function changePassword(req, res) {
    passwords.change(req.body.username,
        req.body.password, req.body.passwordNew).
        then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.status(500).json({error: err.message});
        });
}

function createUserEndpoint(req, res) {
    createUser({
        id: req.body.username,
        password: req.body.password
    }).then(function (user) {
        res.json(user);
    }, function (err) {
        res.status(500).json({error: err.message});
    });
}

function updateUserEndpoint_(req, res) {
    var id = req.body.username,
        authority = req.body.authority;

    find(id).then(function (found) {
        return authorities.change(id, authority).then(function () {
            found.expectedCalories = +req.body.expectedCalories ||
                found.expectedCalories;
            res.sendStatus(200);
        });
    }, function () {
        var password = req.body.password;
        return createUser({
            id:id,
            password:password,
            authority:authority,
            expectedCalories: config.defaultCaloriesPerDay
        }).then(function (user) {
            res.json(user);
        });
    }).fail(function (err) {
        res.status(500).json({ error: err.message });
    });
}

function updateUserEndpoint(req, res) {
    var id = req.body.username,
        authority = req.body.authority;

    // no authority
    if (auth.lessThan(authority < req.user.authority)) {
        res.sendStatus(401);
        return;
    }
    // admins can edit anyone
    if (req.user.authority === authorities.ADM) {
        updateUserEndpoint_(req, res);
        return;
    }
    // greater thans can edit anyone, and people can demote themselves
    if (auth.greaterThan(req.user.authority, authority)) {
        updateUserEndpoint_(req, res);
        return;
    }
    // equal to's other than admins cannot edit each other
    if (req.user.id === id) {
        updateUserEndpoint_(req, res);
        return;
    }
    res.status(500).json({ error: 'unexpected update case' });
}

function getUser(req, res) {
    find(req.params.id).then(function (user) {
        // admins can see admins
        if (req.user.authority === authorities.ADM) {
            res.json(user);
            return;
        }
        // underlings cannot see overlings
        if (auth.lessThan(req.user.authority, user.authority)) {
            res.status(401).json({ error: 'Not Authorized' });
            return;
        }
        // overlings can see underlings
        if (auth.greaterThan(req.user.authority, user.authority)) {
            res.json(user);
            return;
        }
        // equals can see each other? Spec?
        if (req.user.authority === user.authority) {
            res.json(user);
            return;
        }
    });
}

function getAllUsers(req, res) {
    var result;
    if (req.user.authority === authorities.ADM) {
        result = Object.keys(users).map(function (key) {
            return users[key];
        });
    }
    if (req.user.authority === authorities.MGR) {
        result = Object.keys(users).map(function (key) {
            if (users[key].authority <= authorities.MGR) {
                return users[key];
            }
            return null;
        }).filter(function (val) {
            return val;
        });
    }
    if (req.user.authority === authorities.REG) {
        result = Object.keys(users).map(function (key) {
            if (users[key].authority === authorities.REG) {
                return users[key];
            }
            return null;
        }).filter(function (val) {
            return val;
        });
    }
    res.json(result);
}
