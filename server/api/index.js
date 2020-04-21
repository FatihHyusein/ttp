const express = require('express');

const api = express.Router();

api.use('/rentals', require('./rentals'));
api.use('/users', require('./users'));

module.exports = api;
