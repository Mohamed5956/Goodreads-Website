const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const reviewModel = require("../models/review");
const authorModel = require("../models/author");
const categoryModel = require("../models/categories");
const bookModel = require("../models/books");

router.get("/", async (req, res) => {
  try {
    const popularbook = await reviewModel
      .find({ rating: { $gte: 4 } })
      .populate("bookId");

    const popularauthors = [];
    const popularcategories = [];
    for (let i = 0; i < popularbook.length; i++) {
      const popularauthor = await authorModel.findById({
        _id: popularbook[i].bookId.authorId,
      });
      popularauthors.push(popularauthor);
      const popularcategory = await categoryModel.findById({
        _id: popularbook[i].bookId.categoryId,
      });
      popularcategories.push(popularcategory);
    }
    objectpopular = {
      book: "",
      author: "",
      category: "",
    };
    arraypopular = [];

    for (let i = 0; i < popularbook.length; i++) {
      objectpopular = {
        book: popularbook[i],
        author: popularauthors[i],
        category: popularcategories[i],
      };

      arraypopular.push(objectpopular);
    }

    res.send(arraypopular);
  } catch (e) {
    res.send(e);
  }
});


module.exports = router;


