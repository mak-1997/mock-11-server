const express = require("express");
const { getBooks, getSingleBook, addBooks, updateBooks, deleteBooks } = require("../controllers/book.contoller");
const { checkAuth } = require("../middleware/auth.middleware");

const bookRouter = express.Router();
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getSingleBook);
bookRouter.post("/", checkAuth, addBooks);
bookRouter.put("/:id", checkAuth, updateBooks);
bookRouter.delete("/:id", checkAuth, deleteBooks);

module.exports = { bookRouter };