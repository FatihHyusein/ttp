const db = require('../../db');

module.exports = {
    getAll: async (req, res, next) => {
        const allUsers = await db.getDB().collection('users').find().project({ password: 0, }).toArray();

        res.locals = {
            data: allUsers,
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        res.locals = {
            data: {},
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    update: async (req, res, next) => {
        res.locals = {
            data: {},
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    remove: async (req, res, next) => {
        res.locals = {
            data: {},
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
};
