const db = require('../../db');
const ObjectId = require('mongodb').ObjectID;

async function getAllUsers() {
    return await db.getDB().collection('users').find().project({ password: 0, }).toArray();
}

module.exports = {
    getAll: async (req, res, next) => {
        if (req.auth.user.role !== 'admin') {
            return next({ statusCode: 403, message: `You don't have permissions to list users!` });
        }

        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    update: async (req, res, next) => {
        if (req.auth.user.role !== 'admin') {
            return next({ statusCode: 403, message: `You don't have permissions to update users!` });
        }

        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    remove: async (req, res, next) => {
        if (req.auth.user.role !== 'admin') {
            return next({ statusCode: 403, message: `You don't have permissions to delete users!` });
        }

        const { userId } = req.params;

        await db.getDB().collection('users').deleteOne({ '_id': new ObjectId(userId) });

        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
};
