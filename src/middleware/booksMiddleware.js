const { body, param } = require("express-validator");

const createBookMiddleware = [
  body("title").trim().exists().notEmpty(),
  body("author").trim().exists().notEmpty(),
  body("price").trim().exists().notEmpty().isNumeric(),
];

module.exports = {
  createBookMiddleware,
};
