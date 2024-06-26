"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.close = close;
exports.getDb = getDb;
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
const dbName = 'bookDB';
const client = new mongodb_1.MongoClient(url);
let db;
async function connect() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
        db = client.db(dbName);
        return db;
    }
    catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw error;
    }
}
async function close() {
    return client.close();
}
function getDb() {
    if (!db) {
        throw "No Database Connection!";
    }
    return db;
}
