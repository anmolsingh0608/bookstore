const { successResponse } = require("../util/response");
const BookService = require("../services/BookService");
const Book = require("../models/Books");
const bookService = new BookService(Book);

const createBook = async (req, res) => {
  const { title, author, price } = req.body;

  const book = await bookService.create({
    title,
    author,
    price,
  });
  return successResponse(200, "Success", res, book);
};

const getBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const books = await bookService.getAll(page, limit);
  return successResponse(200, "Success", res, books);
};

const update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const book = await bookService.update(data, id);
  return successResponse(200, "Success", res, book);
};

const deleteFn = async (req, res) => {
  const { id } = req.params;
  const book = await bookService.delete(id);
  return successResponse(200, "Success", res, book);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await bookService.getById(id);
  return successResponse(200, "Success", res, book);
};

const search = async (req, res) => {
  const { query } = req.query;
  const books = await bookService.search(query);
  return successResponse(200, "Success", res, books);
};

module.exports = { getBook, getBooks, createBook, deleteFn, update, search };
