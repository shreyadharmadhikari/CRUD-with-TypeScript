import request from "supertest";
import { app } from "../../src/main"; // Import your Express app
import { getDb } from "../../src/db";
import { ObjectId } from "mongodb";

jest.mock("../../src/db"); // Mock the database module

describe("Book Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all books", async () => {
    const mockBooks = [{ bookName: "Test Book", bookType: "Test Type" }];
    (getDb as jest.Mock).mockReturnValue({
      collection: () => ({
        find: () => ({
          toArray: () => Promise.resolve(mockBooks),
        }),
      }),
    });
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBooks);
  });

  it("should get book by id", async () => {
    const mockBook = {
      _id: new ObjectId("60d5ec9af682fbd12a8923e9").toString(),
      bookName: "Test Book",
      authorName: "Test Author",
      bookPrice: 100,
      bookType: "Test Type",
      noOfPages: 200,
    };

    (getDb as jest.Mock).mockReturnValue({
      collection: () => ({
        findOne: () => Promise.resolve(mockBook),
      }),
    });

    const res = await request(app).get("/books/60d5ec9af682fbd12a8923e9");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBook);
  });
});
// Add similar tests for insertBook, updateBook, deleteBook, searchBook, filterBook

it("should insert a new book", async () => {
  const mockBook = {
    bookName: "Test Book",
    authorName: "Test Author",
    bookPrice: 100,
    bookType: "Test Type",
    noOfPages: 200,
  };

  (getDb as jest.Mock).mockReturnValue({
    collection: () => ({
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ ops: [mockBook] }),
    }),
  });

  const res = await request(app).post("/books").send(mockBook);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ ops: [mockBook] });
});

it("should update a book", async () => {
  const mockBook = {
    _id: new ObjectId("60d5ec9af682fbd12a8923e9").toString(),
    bookName: "Updated Book",
    authorName: "Updated Author",
    bookPrice: 150,
    bookType: "Updated Type",
    noOfPages: 250,
  };

  (getDb as jest.Mock).mockReturnValue({
    collection: () => ({
      updateOne: () => Promise.resolve({ result: { ok: 1 } }),
    }),
  });

  const res = await request(app)
    .put(`/books/edit/${mockBook._id}`)
    .send(mockBook);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ result: { ok: 1 } });
});

it("should delete a book", async () => {
  const bookId = new ObjectId("60d5ec9af682fbd12a8923e9").toString();

  (getDb as jest.Mock).mockReturnValue({
    collection: () => ({
      deleteOne: () => Promise.resolve({ deletedCount: 1 }),
    }),
  });

  const res = await request(app).delete(`/books/delete/${bookId}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ deletedCount: 1 });
});

it("should search for a book", async () => {
  const mockBook = {
    _id: new ObjectId("60d5ec9af682fbd12a8923e9").toString(),
    bookName: "Test Book",
    authorName: "Test Author",
    bookPrice: 100,
    bookType: "Test Type",
    noOfPages: 200,
  };

  (getDb as jest.Mock).mockReturnValue({
    collection: () => ({
      find: () => ({
        toArray: () => Promise.resolve([mockBook]),
      }),
    }),
  });

  const res = await request(app).get(`/books/search/${mockBook.bookName}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual([mockBook]);
});

it("should filter books by type", async () => {
  const mockBook = {
    _id: new ObjectId("60d5ec9af682fbd12a8923e9").toString(),
    bookName: "Test Book",
    authorName: "Test Author",
    bookPrice: 100,
    bookType: "Test Type",
    noOfPages: 200,
  };

  (getDb as jest.Mock).mockReturnValue({
    collection: () => ({
      find: () => ({
        toArray: () => Promise.resolve([mockBook]),
      }),
    }),
  });

  const res = await request(app).get(`/books/filter/${mockBook.bookType}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual([mockBook]);
});
