const express = require('express');
const { getAll, create, update, remove } = require('./rentals.api');
const { USER_ROLES } = require('../../costants');

const api = express.Router();


async function preventClientHit(req, res, next) {
    if (req.auth.user.role === USER_ROLES.CUSTOMER) {
        return next({ statusCode: 403, message: `You don't have permissions!` });
    }

    next();
}

api.get('/', getAll);
api.post('/', preventClientHit, create);
api.put('/:rentalId', preventClientHit, update);
api.delete('/:rentalId', preventClientHit, remove);

module.exports = api;
