const express = require("express");
const admin = require("../middlewares/admin");
const router = express.Router();
const booksModel = require("../models/books");

router.get("/", async (req, res) => {
  try {
    const books = await booksModel
      .find({})
      .populate("authorId")
      .populate("categoryId")
      .populate("ratingId")
      .populate("reviewId")
      .populate("status");
    res.send(books);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel
      .findById({ _id: id })
      .populate("authorId")
      .populate("categoryId")
      .populate("ratingId")
      .populate("reviewId")
      .populate("status");
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", admin, async (req, res) => {
  const book = new booksModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findByIdAndUpdate(id);

    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findByIdAndDelete({ _id: id });
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
