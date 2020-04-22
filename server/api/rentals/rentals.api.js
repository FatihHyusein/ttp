const db = require('../../db');
const ObjectId = require('mongodb').ObjectID;
const { USER_ROLES } = require('../../costants');

async function getAllRentals(user) {
    const findQuery = user.role === USER_ROLES.CUSTOMER
        ? { isAvailable: true }
        : {};

    return await db.getDB().collection('rentals').find(findQuery).toArray();
}

module.exports = {
    getAll: async (req, res, next) => {
        res.locals = {
            data: await getAllRentals(req.auth.user),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        const { name, description, floorAreaSize, pricePerMonth, roomsCount, coordinates, associatedRealtorId, isAvailable } = req.body;

        if (!name || !description || !floorAreaSize || !pricePerMonth || !roomsCount || !coordinates || !associatedRealtorId || !isAvailable) {
            return next({ statusCode: 400, message: `All fields are required` });
        }

        const dateAdded = new Date();

        const insertResult = await db.getDB().collection('rentals').insertOne({
            name,
            description,
            floorAreaSize,
            pricePerMonth,
            roomsCount,
            coordinates,
            associatedRealtorId,
            dateAdded,
            isAvailable
        });

        if (insertResult.insertedCount === 1) {
            res.locals = {
                data: await getAllRentals(req.auth.user),
                toastMessages: [],
                confirmMessage: '',
            };

            return next();
        }

        next({ statusCode: 400, message: `Could not create user!` });
    },

    update: async (req, res, next) => {
        const { rentalId } = req.params;

        const updateResult = await db.getDB().collection('rentals').updateOne(
            { _id: new ObjectId(rentalId) },
            {
                $set:
                    Object.entries(req.body).reduce((acc, [key, value]) => {
                        if (typeof value !== 'undefined') {
                            return {
                                ...acc,
                                [key]: value
                            };
                        }
                        return acc;
                    }, {})
            }
        );

        if (updateResult.result.ok) {
            res.locals = {
                data: await getAllRentals(req.auth.user),
                toastMessages: [],
                confirmMessage: '',
            };

            return next();
        }

        next({ statusCode: 400, message: `Could not update user!` });
    },

    remove: async (req, res, next) => {
        const { rentalId } = req.params;

        await db.getDB().collection('rentals').deleteOne({ '_id': new ObjectId(rentalId) });

        res.locals = {
            data: await getAllRentals(req.auth.user),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
};
