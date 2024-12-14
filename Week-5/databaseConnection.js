const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/"; // Local MongoDB URI
let db;

const connectToDatabase = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("salonDB"); // Name of the database
        console.log("Connected to MongoDB at localhost:27017");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

const getDatabase = () => db;

module.exports = { connectToDatabase, getDatabase };
