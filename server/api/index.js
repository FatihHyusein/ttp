const express = require('express');

const api = express.Router();

api.use('/rentals', require('./rentals'));
api.use('/users', async (req, res, next) => {
    if (req.auth.user.role !== 'admin') {
        return next({ statusCode: 403, message: `You don't have permissions!` });
    }

    next();
}, require('./users'));

module.exports = api;
