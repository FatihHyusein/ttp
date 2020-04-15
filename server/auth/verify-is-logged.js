const jwt = require('jsonwebtoken');
const db = require('../db');
const { getJwtSign } = require('./pass-encription.util');

module.exports = async (req, res, next) => {
    if (req.originalUrl === '/api/auth/register' ||
        req.originalUrl === '/api/auth/login' ||
        req.originalUrl === '/api/auth/logout') {
        next();
    } else {
        try {
            req.auth = jwt.verify(req.headers.authorization, process.env.login_key || 'shhhhh');
            const existingUser = await db.getDB().collection('users').findOne({
                username: req.auth.username,
            });

            if (!existingUser) {
                return next({ statusCode: 401, message: `${req.auth.username} does not exist!` });
            }

            res.token = getJwtSign(req.auth.user);

            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                next({ statusCode: 401, message: 'Authentication is expired!' });
            } else {
                next({ statusCode: 401, message: 'Not authorised!' });
            }
        }
    }
};
