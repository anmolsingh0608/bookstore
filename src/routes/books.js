const {
  createBook,
  getBook,
  getBooks,
  deleteFn,
  update,
  search,
} = require("../controllers/booksController");
const authMiddleware = require("../middleware/authMiddleware");
const { createBookMiddleware } = require("../middleware/booksMiddleware");
const { tryCatchWrapperAsync } = require("../util/try-catch-wrapper");

const router = require("express").Router();

router.get("/search", tryCatchWrapperAsync(search));

router.get("/", tryCatchWrapperAsync(getBooks));

router.post(
  "/",
  authMiddleware,
  createBookMiddleware,
  tryCatchWrapperAsync(createBook)
);

router.get("/:id", tryCatchWrapperAsync(getBook));

router.put("/:id", authMiddleware, tryCatchWrapperAsync(update));

router.delete("/:id", authMiddleware, tryCatchWrapperAsync(deleteFn));

module.exports = router;
