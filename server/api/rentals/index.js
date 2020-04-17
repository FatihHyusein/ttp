const express = require('express');
const { getAll, create, update, remove } = require('./rentals.api');

const api = express.Router();


api.get('/', getAll);
api.post('/', create);
api.put('/:rentalId', update);
api.delete('/:rentalId', remove);

module.exports = api;
