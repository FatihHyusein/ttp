const express = require('express');
const { getAll, create, update, remove, getRealtorsOnly } = require('./users.api');
const { USER_ROLES } = require('../../costants');

const api = express.Router();

async function preventNonAdminHit(req, res, next) {
    if (req.auth.user.role !== USER_ROLES.ADMIN) {
        return next({ statusCode: 403, message: `You don't have permissions!` });
    }

    next();
}

api.get('/', preventNonAdminHit, getAll);
api.get('/realtor', getRealtorsOnly);
api.post('/', preventNonAdminHit, create);
api.put('/:userId', preventNonAdminHit, update);
api.delete('/:userId', preventNonAdminHit, remove);

module.exports = api;
