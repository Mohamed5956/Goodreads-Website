const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const authorModel = require("../models/author");

const router = express.Router();
const booksModel = require("../models/books");

router.get("/", async (req, res) => {
  try {
    // let { page, size, sort } = req.query;

    // If the page is not applied in query.
    // if (!page) {
    // Make the Default value one.
    //   page = 1;
    // }

    // if (!size) {
    //   size = 2;
    // }
    // const limit = parseInt(size);
    // .sort(_id)
    // .limit(limit)
    const books = await booksModel
      .find({})
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");
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
      .populate("reviewId");
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

router.patch("/:id", admin, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const book = await booksModel.findByIdAndUpdate(id, updates);
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    // const deletedAuthor = await authorModel.deleteMany({ authorId: id });
    const book = await booksModel.findByIdAndDelete({ _id: id });
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

//------------/books/author/:authorId
router.get("/author/:authorId", async (req, res) => {
  const id = req.params.authorId;
  try {
    const book = await booksModel
      .find({ authorId: id })
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});
//--------/books/category/:categoryId
router.get("/category/:categoryId", async (req, res) => {
  const id = req.params.categoryId;
  try {
    const book = await booksModel
      .find({ categoryId: id })
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
