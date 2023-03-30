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

// [{
//     book:[                      // use filter in angular
//       {

//       }
//     ]
// author:[                       // use filter in angular
//   {
// 
//   }
// ]
//   }]

module.exports = router;

// // //add comment
// // router.post("/", auth, async (req, res) => {
// //     const comment = new commentModel(req.body);
// //     try {
// //       await comment.save();
// //       res.send(comment);
// //     } catch (e) {
// //       res.send(e);
// //     }
// //   });
// // // update comment
// // router.patch("/:id", auth, async (req, res) => {
// //     const id = req.params.id;
// //     const updatedData = req.body;
// //     try {
// //       const comment = await commentModel.findByIdAndUpdate(id, updatedData);
// //       res.send(updatedData);
// //     } catch (e) {
// //       res.send(e);
// //     }
// //   });
// // // delete comment
// // router.delete("/:id", auth, async (req, res) => {
// //     const id = req.params.id;
// //     try {
// //       const comment = await commentModel.findByIdAndDelete({ _id: id });
// //       res.send(comment);
// //     } catch (e) {
// //       res.send(e);
// //     }
// //   });
