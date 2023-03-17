const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const authorModel = require("../models/author");

const router = express.Router();
const booksModel = require("../models/books");
const fs = require("fs");
const path = require("path");

// pagination all books
router.get("/page/:page", async (req, res) => {
  try {
    const page = req.params.page;
    const limit = 1;
    const countBooks = await booksModel.find({}).count(); //num category
    const totalPages = Math.ceil(countBooks / limit); //num pages

    const booksPage = await booksModel
      .find({})
      .populate("authorId")
      .populate("categoryId")
      .populate("reviewId")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const objBooks = {
      pages: {
        totalPages,
        page,
      },
      data: booksPage,
    };
       return res.json(objBooks);
    } catch (err) {
        res.status(500).send(err)
    }
});

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
// router.get("/author/:authorId", async (req, res) => {
//   const id = req.params.authorId;
//   try {
//     const book = await booksModel
//       .find({ authorId: id })
//       .populate("authorId")
//       .populate("categoryId")
//       .populate("reviewId");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.send(book);
//   } catch (e) {
//     res.send(e);
//   }
// });
// //--------/books/category/:categoryId
// router.get("/category/:categoryId", async (req, res) => {
//   const id = req.params.categoryId;
//   try {
//     const book = await booksModel
//       .find({ categoryId: id })
//       .populate("authorId")
//       .populate("categoryId")
//       .populate("reviewId");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.send(book);
//   } catch (e) {
//     res.send(e);
//   }
// });

module.exports = router;
