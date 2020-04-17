const db = require('../../db');
const ObjectId = require('mongodb').ObjectID;
const { encript } = require('../../auth/pass-encription.util');

async function getAllUsers() {
    return await db.getDB().collection('users').find().project({ password: 0, }).toArray();
}

module.exports = {
    getAll: async (req, res, next) => {
        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        const { username, password, role } = req.body;

        const insertResult = await db.getDB().collection('users').insertOne({
            username,
            password: encript(password),
            role
        });

        if (insertResult.insertedCount === 1) {
            res.locals = {
                data: await getAllUsers(),
                toastMessages: [],
                confirmMessage: '',
            };

            return next();
        }

        next({ statusCode: 400, message: `Could not create user!` });
    },

    update: async (req, res, next) => {
        const { userId } = req.params;

        const updateResult = await db.getDB().collection('users').update(
            { _id: new ObjectId(userId) },
            {
                $set:
                    Object.entries(req.body).reduce((acc, [key, value]) => {
                        if (value) {
                            return {
                                ...acc,
                                [key]: key === 'password' ? encript(value) : value
                            };
                        }
                        return acc;
                    }, {})
            }
        );

        res.locals = {
            data: await getAllUsers(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    remove: async (req, res, next) => {
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
