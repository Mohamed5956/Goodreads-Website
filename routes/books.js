const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const authorModel = require("../models/author");
const reviewModel = require("../models/review");

const router = express.Router();
const booksModel = require("../models/books");
const fs = require("fs");
const path = require("path");



// get all books
router.get("/", async (req, res) => {
  try {

    const books = await booksModel
      .find({})
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId")
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

router.post("/", [admin, upload("book").single("image")], async (req, res) => {
  const book = new booksModel({
    title: req.body.title,
    description: req.body.description,
    categoryId: req.body.categoryId,
    authorId: req.body.authorId,
    reviewId: req.body.reviewId,
    image: req.file.filename,
  });
  try {
    await book.save();
    res.send(book);
  } catch (e) {
    res.send(e);
  }
});

router.patch(
  "/:id",
  [admin, upload("book").single("image")],
  async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const book = await booksModel.findById(id);
      if (!book) {
        res.status(404);
        console.log("book not found");
      }
      console.log(book);
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../assets/uploads/book",
          book.image
        );
        fs.unlinkSync(imagePath);
        book.image = req.file.filename;
      }
      book.title = req.body.title;
      book.description = req.body.description;
      book.authorId = req.body.authorId;
      book.categoryId = req.body.categoryId;
      book.reviewId = req.body.reviewId;
      console.log(book);
      await book.save();
      res.send(book);
    } catch (e) {
      res.send(e);
    }
  }
);

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findById(id);
    console.log(book);
    if (!book) {
      res.status(404).send("book not found");
    }
    const imagePath = path.join(
      __dirname,
      "../assets/uploads",
      "book",
      book.image
    );
    fs.unlinkSync(imagePath);
    const deletedBook = await booksModel.findByIdAndDelete(id);
    res.send(deletedBook);
  } catch (e) {
    res.send(e);
  }
});

//------------/books/author/:authorId
router.get("/author/:authorId", async (req, res) => {
  const id = req.params.authorId;
  const avgBook=[]
  try {
    const book = await booksModel
      .find({ authorId: id })
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId");

       for(let i=0;i<book.length;i++)
       {
        const ratingsBook = await reviewModel.find({ bookId: book[i]._id });
        const arrRatings = ratingsBook.map((elm) => elm.rating);
        var ratingsSum = 0;
        arrRatings.forEach((elm) => {
          ratingsSum += elm;
        });
        let avgRating ;
          if(arrRatings.length == 0)
          {
            avgRating = 0;
          }
          else
          {
            avgRating = ratingsSum / arrRatings.length;
          }
        
          rateObj = {
            "avg": avgRating,
            "count": arrRatings.length,
          };
          avgBook.push(rateObj);
       }

      const bookWithAvg=[]
          bookandavg={
            "book":'',
            "avg":'',
          }
           for(let i=0;i<book.length;i++)
           {
            bookandavg={
              "book":book[i],
              "avg":avgBook[i],
            } 
            bookWithAvg.push(bookandavg);
           }
      
   

    res.send(bookWithAvg);
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
