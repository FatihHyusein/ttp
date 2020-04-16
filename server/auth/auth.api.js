const db = require('../db');
const express = require('express');
const { encript, getJwtSign } = require('./pass-encription.util');


const api = express.Router();

api.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (typeof username === 'undefined' || typeof password === 'undefined') {
        return next({ statusCode: 400, message: 'Username and password can not be empty!' });
    }

    try {
        const existingUser = await db.getDB().collection('users').findOne({
            username,
            password: encript(password),
        });

        if (existingUser) {
            res.token = getJwtSign({
                    _id: existingUser._id.toString(),
                    username,
                    role: existingUser.role
                }
            );

            res.locals = {
                data: {},
                toastMessages: [],
                confirmMessage: '',
            };

            return next();
        }

        next({ statusCode: 400, message: 'Wrong username or password!' });
    } catch (e) {
        console.error(e);
        next({ statusCode: 400, message: 'Wrong user input!' });
    }
});

api.post('/register', async (req, res, next) => {
    const { username, password, confirmPassword, role } = req.body;

    if (typeof username === 'undefined' || typeof password === 'undefined' || password !== confirmPassword || typeof role === 'undefined') {
        return next({ statusCode: 400, message: 'There are empty form items!' });
    }

    try {
        const insertResult = await db.getDB().collection('users').insertOne({
            username,
            password: encript(password),
            role
        });

        if (insertResult.insertedCount === 1) {
            res.token = getJwtSign({
                _id: insertResult.insertedId.toString(),
                username,
                role
            });

            res.locals = {
                data: {},
                toastMessages: [],
                confirmMessage: '',
            };

            return next();
        }

        next({ statusCode: 400, message: 'Could not register' });
    } catch (e) {
        console.error(e);
        if (e.constraint === 'users_email_key' || e.constraint === 'users_pkey') {
            next({ statusCode: 400, message: `${email} already exists` });
        } else {
            next({ statusCode: 400, message: 'Could not register' });
        }
    }

});

api.post('/logout', async (req, res, next) => {
    res.locals = {
        data: { loggedOut: true },
        toastMessages: [],
        confirmMessage: '',
    };

    next();
});

module.exports = api;
