import { getDb } from "../db";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

// 1. GET method: getting all books from database
export async function getAllBooks(req: Request, res: Response) {
  try {
    const db = getDb();
    const books = await db.collection("books").find().toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 2. GET method: getting book by book id
export async function getBookById(req: Request, res: Response) {
  try {
    const db = getDb();
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 3. POST method: Inserting new book in database
export async function insertBook(req: Request, res: Response) {
  try {
    const db = getDb();
    const bookExists = await db
      .collection("books")
      .findOne({ bookName: req.body.bookName });

    if (bookExists) {
      res.status(400).json({
        message:
          "Book with the same name already exists. Duplicate entries for book name are not allowed.",
      });
    } else {
      const result = await db.collection("books").insertOne(req.body);
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 4. PUT method: Updating book in the database by book id
export async function updateBook(req: Request, res: Response) {
  try {
    const db = getDb();
    const bookId = new ObjectId(req.params.id); // Convert string to ObjectId
    const result = await db
      .collection("books")
      .updateOne({ _id: bookId }, { $set: req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 5. DELETE method: Deleting book by book id
export async function deleteBook(req: Request, res: Response) {
  try {
    const db = getDb();
    const bookId = new ObjectId(req.params.id); // Convert string to ObjectId
    const result = await db.collection("books").deleteOne({ _id: bookId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 6. GET method: Searching a book with book name
export async function searchBook(req: Request, res: Response) {
  try {
    const db = getDb();
    const books = await db
      .collection("books")
      .find({ bookName: { $regex: new RegExp(req.params.name, "i") } })
      .toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// 7. GET method: To filter book by book type
export async function filterBook(req: Request, res: Response) {
  try {
    const db = getDb();
    const books = await db
      .collection("books")
      .find({ bookType: req.params.type })
      .toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
}
