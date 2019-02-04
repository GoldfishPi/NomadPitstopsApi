const jwt = require('jsonwebtoken');
const config = require('../config.json');
const user = require('../models/user');

function applyAccess(req, level) {
    try {
        var token = jwt.decode(req.headers.token, config.secret);
        return user.findById(token.sub, (err, user) => {
            if (user.access === 'USER') {
                req.access = 1;
            } else if ((user.access = 'ADMIN')) {
                req.access = 2;
            }
        });
    } catch (err) {
        req.access = 0;
        return Promise.resolve();
    }
}

module.exports.ANY = function(req, res, next) {
    applyAccess(req, 0).then(() => {
        return next();
    });
};

module.exports.USER = function(req, res, next) {
    applyAccess(req, 1).then(() => {});
    try {
        var token = jwt.decode(req.headers.token, config.secret);
        user.findById(token.sub, (err, user) => {
            if (user.access === 'USER') {
                return next();
            }
            res.json({
                msg: 'You dont have access to this route'
            });
        });
    } catch (err) {
        res.json({
            msg: 'You need a token to access this route'
        });
    }
};

module.exports.ADMIN = function(req, res, next) {
    applyAccess(req, 2);
    try {
        var token = jwt.decode(req.headers.token, config.secret);
        user.findById(token.sub, (err, user) => {
            if (user.access === 'ADMIN') {
                req.ADMIN = true;
                return next();
            }
            res.json({
                msg: 'You dont have access to this route'
            });
        });
    } catch (err) {
        res.json({
            msg: 'You need a token to access this route'
        });
    }
};
