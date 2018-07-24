const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const mongoose = require("mongoose");
const tryWrapper = require("../middlewares/tryWrapper");

/* GET books listing. */
router.get(
  "/",
  tryWrapper(async (req, res, next) => {
    const books = await Book.find().populate("author");
    res.json(books);
  })
);

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post(
  "/",
  tryWrapper(async (req, res, next) => {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });

    await newBook.save();

    res.status(201).json({ message: `created a new book successfully` });
  })
);

router.put("/:id", (req, res, next) => {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = app => {
  app.use("/books", router);
};
