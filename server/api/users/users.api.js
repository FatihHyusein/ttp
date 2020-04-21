const db = require('../../db');
const { MONGO_DUPLICATE_ERROR_CODE } = require('../../costants');
const ObjectId = require('mongodb').ObjectID;
const { encript } = require('../../auth/pass-encription.util');
const { USER_ROLES } = require('../../costants');

async function getAllUsers(role) {
    const queryObject = role ? { $eq: role } : { $ne: USER_ROLES.ADMIN };
    return await db.getDB().collection('users').find({ role: queryObject }).project({ password: 0, }).toArray();
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

    getRealtorsOnly: async (req, res, next) => {
        res.locals = {
            data: await getAllUsers(USER_ROLES.REALTOR),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        const { username, password, role } = req.body;

        try {
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
        } catch (e) {
            if (e.code === MONGO_DUPLICATE_ERROR_CODE) {
                return next({ statusCode: 400, message: `Username is taken` });
            }
        }

        next({ statusCode: 400, message: `Could not create user!` });
    },

    update: async (req, res, next) => {
        const { userId } = req.params;

        try {
            const updateResult = await db.getDB().collection('users').updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set:
                        Object.entries(req.body).reduce((acc, [key, value]) => {
                            if (typeof value !== 'undefined') {
                                return {
                                    ...acc,
                                    [key]: key === 'password' ? encript(value) : value
                                };
                            }
                            return acc;
                        }, {})
                }
            );

            if (updateResult.result.ok) {
                res.locals = {
                    data: await getAllUsers(),
                    toastMessages: [],
                    confirmMessage: '',
                };

                return next();
            }
        } catch (e) {
            if (e.code === MONGO_DUPLICATE_ERROR_CODE) {
                return next({ statusCode: 400, message: `Username is taken` });
            }
        }

        next({ statusCode: 400, message: `Could not update user!` });
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
