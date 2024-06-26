import { MongoClient, Db } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "bookDB";

const client = new MongoClient(url);
let db: Db;

export async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
}

export async function close() {
  return client.close();
}

export function getDb() {
  if (!db) {
    throw "No Database Connection!";
  }
  return db;
}
