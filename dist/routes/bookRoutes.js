"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const cors_1 = __importDefault(require("cors")); // Import the 'cors' package
const router = express_1.default.Router();
// // Use cors middleware and allow requests from "http://localhost:3000"
router.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
// 1. GET method: getting all books from database
router.get("/books", bookController_1.getAllBooks);
// 2. GET method: getting book by book id
router.get("/books/:id", bookController_1.getBookById);
// 3. POST method: Inserting new book in database
router.post("/books", bookController_1.insertBook);
// 4. PUT method: Updating book in the database by book id
router.put("/books/edit/:id", bookController_1.updateBook);
// 5. DELETE method: Deleting book by book id
router.delete("/books/delete/:id", bookController_1.deleteBook);
// 6. GET method: Searching a book with book name
router.get("/books/search/:name", bookController_1.searchBook);
// 7. GET method: To filter book by book type
router.get("/books/filter/:type", bookController_1.filterBook);
exports.default = router;
