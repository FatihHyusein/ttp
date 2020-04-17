const db = require('../../db');
const ObjectId = require('mongodb').ObjectID;

async function getAllRentals() {
    return await db.getDB().collection('rentals').find().toArray();
}

module.exports = {
    getAll: async (req, res, next) => {
        res.locals = {
            data: await getAllRentals(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    create: async (req, res, next) => {
        const { name, description, floorAreaSize, pricePerMonth, roomsCount, coordinates, associatedRealtorId } = req.body;

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
        });

        if (insertResult.insertedCount === 1) {
            res.locals = {
                data: await getAllRentals(),
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
                        if (value) {
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
                data: await getAllRentals(),
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
            data: await getAllRentals(),
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
};
