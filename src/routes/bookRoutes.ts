import express from "express";
import {
  getAllBooks,
  getBookById,
  insertBook,
  updateBook,
  deleteBook,
  searchBook,
  filterBook,
} from "../controller/bookController";
import cors from "cors"; // Import the 'cors' package
const router = express.Router();

// // Use cors middleware and allow requests from "http://localhost:3000"
router.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// 1. GET method: getting all books from database
router.get("/books", getAllBooks);

// 2. GET method: getting book by book id
router.get("/books/:id", getBookById);

// 3. POST method: Inserting new book in database
router.post("/books", insertBook);

// 4. PUT method: Updating book in the database by book id
router.put("/books/edit/:id", updateBook);

// 5. DELETE method: Deleting book by book id
router.delete("/books/delete/:id", deleteBook);

// 6. GET method: Searching a book with book name
router.get("/books/search/:name", searchBook);

// 7. GET method: To filter book by book type
router.get("/books/filter/:type", filterBook);

export default router;
