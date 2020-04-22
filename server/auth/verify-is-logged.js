const jwt = require('jsonwebtoken');
const db = require('../db');
const { getJwtSign } = require('./pass-encription.util');
const ObjectId = require('mongodb').ObjectID;

module.exports = async (req, res, next) => {
    if (req.originalUrl.indexOf('/api/auth') === 0) {
        next();
    } else {
        try {
            req.auth = jwt.verify(req.headers.authorization, process.env.LOGIN_KEY || 'shhhhh');
            const existingUser = await db.getDB().collection('users').findOne({
                _id: new ObjectId(req.auth.user._id),
            });

            if (!existingUser) {
                return next({ statusCode: 401, message: `${req.auth.user.username} does not exist!` });
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
