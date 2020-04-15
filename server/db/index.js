const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://rentals-manager-admin:rentals-manager-admin1@ds263656.mlab.com:63656/rentals-manager';

let connection = null;
let db = null;

module.exports = {
    getConnection: () => {
        return connection;
    },
    getDB: () => {
        return db;
    },
    initiateDbConnection: async () => {
        const client = new MongoClient(url, { useUnifiedTopology: true });

        connection = await client.connect();
        db = client.db('rentals-manager');


        return connection;
    }
};