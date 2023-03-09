const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

const router = express.Router();
const booksModel = require("../models/books");

router.get("/", async (req, res) => {
  try {
    const books = await booksModel
      .find({})
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(books);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let { page, size, sort } = req.query;
  
    // If the page is not applied in query.
    if (!page) {

        // Make the Default value one.
        page = 1;
    }

    if (!size) {
        size = 10;
    }
    const book = await booksModel
      .findById({ _id: id })
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", admin, async (req, res) => {
  const book = new booksModel(req.body);
  try {
    await book.save();
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
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
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findByIdAndDelete({ _id: id });
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
