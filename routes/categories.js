const express = require("express");
const router = express.Router();
const categoryModel = require("../models/categories");
const booksModel = require("../models/books");
const auth = require("../middlewares/auth");

// display all categories---------------------

router.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.send(categories);
  } catch (err) {
    res.send(err);
  }
});

// display one category and her books-------------

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // const books = await booksModel.find({ categoryId: id });
    const category = await categoryModel.findById({ _id: id });
    res.send(category);
  } catch (e) {
    res.send(e);
  }
});

// add category -----------------------

router.post("/", auth, async (req, res) => {
  const category = new categoryModel(req.body);
  try {
    await category.save();
    res.send(category);
  } catch (e) {
    res.send(e);
  }
});

// update category-----------------------

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const category = await categoryModel.findByIdAndUpdate(id, updates);
    res.send(category);
  } catch (e) {
    res.send(e);
  }
});

// delete category and her books-----------------------

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    // const book = await booksModel.deleteMany({ categoryId : id });
    const category = await categoryModel.findByIdAndDelete({ _id: id });
    res.send(category);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
