const express = require('express');
const { getAll, create, update, remove } = require('./rentals.api');

const api = express.Router();


api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getAll));
api.post('/', (req, res, next) => baseRouteHandler(req, res, next, create));
api.put('/', (req, res, next) => baseRouteHandler(req, res, next, update));
api.delete('/:rentalId', (req, res, next) => baseRouteHandler(req, res, next, remove));

module.exports = api;
