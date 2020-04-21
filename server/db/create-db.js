const db = require('./');

async function createDbStructure() {
    try {
        const conn = await db.initiateDbConnection();
        db.getDB().collection('users').createIndex({ username: 1 }, { unique: true });
        console.log('Created Index');
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

createDbStructure();
