const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
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
// router.post(
//   "/",
//   [admin, upload("category").single("image")],
//   async (req, res) => {
//     const path = "/assets/uploads/category/";
//     const category = new categoryModel({
//       name: req.body.name,
//       image: req.file.filename,
//     });
//     try {
//       await category.save();
//       res.send(category);
//     } catch (e) {
//       res.send(e);
//     }
//   }
// );
router.post("/", [admin, upload("book").single("image")], async (req, res) => {
  const path = "/assets/uploads/book/";
  const book = new booksModel({
    title: req.body.title,
    description:req.body.description,
    categoryId:req.body.categoryId,
    authorId:req.body.authorId,
    reviewId:req.body.reviewId,
    image: req.file.filename,
  });
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
