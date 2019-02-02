const jwt = require('jsonwebtoken');
const config = require('../config.json');
const user = require('../models/user');

module.exports.USER = function(req, res, next) {
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
    try {
        var token = jwt.decode(req.headers.token, config.secret);
        user.findById(token.sub, (err, user) => {
            if (user.access === 'ADMIN') {
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
