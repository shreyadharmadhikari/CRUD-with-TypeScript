"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.insertBook = insertBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.searchBook = searchBook;
exports.filterBook = filterBook;
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
// 1. GET method: getting all books from database
async function getAllBooks(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const books = await db.collection("books").find().toArray();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 2. GET method: getting book by book id
async function getBookById(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const book = await db
            .collection("books")
            .findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 3. POST method: Inserting new book in database
async function insertBook(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const bookExists = await db
            .collection("books")
            .findOne({ bookName: req.body.bookName });
        if (bookExists) {
            res.status(400).json({
                message: "Book with the same name already exists. Duplicate entries for book name are not allowed.",
            });
        }
        else {
            const result = await db.collection("books").insertOne(req.body);
            res.json(result);
        }
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 4. PUT method: Updating book in the database by book id
async function updateBook(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const bookId = new mongodb_1.ObjectId(req.params.id); // Convert string to ObjectId
        const result = await db
            .collection("books")
            .updateOne({ _id: bookId }, { $set: req.body });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 5. DELETE method: Deleting book by book id
async function deleteBook(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const bookId = new mongodb_1.ObjectId(req.params.id); // Convert string to ObjectId
        const result = await db.collection("books").deleteOne({ _id: bookId });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 6. GET method: Searching a book with book name
async function searchBook(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const books = await db
            .collection("books")
            .find({ bookName: { $regex: new RegExp(req.params.name, "i") } })
            .toArray();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
// 7. GET method: To filter book by book type
async function filterBook(req, res) {
    try {
        const db = (0, db_1.getDb)();
        const books = await db
            .collection("books")
            .find({ bookType: req.params.type })
            .toArray();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
}
