const express = require('express');
const { getAll, create, update, remove } = require('./users.api');

const api = express.Router();


api.get('/', getAll);
api.post('/', create);
api.put('/:userId', update);
api.delete('/:userId', remove);

module.exports = api;
