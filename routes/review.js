const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const reviewModel = require("../models/review");
const bookModel = require("../models/books");
const authorModel = require("../models/author");

router.get("/allReviews", async (req, res) => {
  const reviews = await reviewModel.find();
  res.send(reviews);
});

router.get("/", async (req, res) => {
  try {
    const state = req.query.state;
    const userid = req.query.id;
    if (state == "all") {
      const reviews = await reviewModel
        .find({ userId: userid })
        .populate("bookId");
      const books = await reviews.map((elm) => elm.bookId);
      const authorsid = await books.map((elm) => elm.authorId);
      const authors = [];
      const rating = [];
      for (let i = 0; i < authorsid.length; i++) {
        authors.push(await authorModel.findById(authorsid[i]));
      }

      for (let i = 0; i < reviews.length; i++) {
        const ratingsBook = await reviewModel.find({ bookId: books[i] });
        const arrRatings = ratingsBook.map((elm) => elm.rating);
        var ratingsSum = 0;
        arrRatings.forEach((elm) => {
          ratingsSum += elm;
        });
        let avgRating;
        if (arrRatings.length == 0) {
          avgRating = 0;
        } else {
          avgRating = ratingsSum / arrRatings.length;
        }
        rating.push(avgRating);
      }

      onebook = {
        book: "",
        authors: "",
        avg_rating: "",
      };
      mybook = [];

      for (let i = 0; i < authorsid.length; i++) {
        onebook = {
          book: reviews[i],
          authors: authors[i],
          avg_rating: rating[i],
        };

        mybook.push(await onebook);
      }
      res.send(mybook);
    } else if (state == "Read") {
      const reviews = await await reviewModel
        .find({ userId: userid, status: "readed" })
        .populate("bookId");
      const books = await reviews.map((elm) => elm.bookId);
      const authorsid = await books.map((elm) => elm.authorId);
      const authors = [];
      const rating = [];
      for (let i = 0; i < authorsid.length; i++) {
        authors.push(await authorModel.findById(authorsid[i]));
      }

      for (let i = 0; i < reviews.length; i++) {
        const ratingsBook = await reviewModel.find({ bookId: books[i] });
        const arrRatings = ratingsBook.map((elm) => elm.rating);
        var ratingsSum = 0;
        arrRatings.forEach((elm) => {
          ratingsSum += elm;
        });
        let avgRating;
        if (arrRatings.length == 0) {
          avgRating = 0;
        } else {
          avgRating = ratingsSum / arrRatings.length;
        }
        rating.push(avgRating);
      }

      onebook = {
        book: "",
        authors: "",
        avg_rating: "",
      };
      mybook = [];

      for (let i = 0; i < authorsid.length; i++) {
        onebook = {
          book: reviews[i],
          authors: authors[i],
          avg_rating: rating[i],
        };

        mybook.push(await onebook);
      }
      res.send(mybook);
    } else if (state == "want") {
      const reviews = await reviewModel
        .find({ userId: userid, status: "want to read" })
        .populate("bookId");
      const books = await reviews.map((elm) => elm.bookId);
      const authorsid = await books.map((elm) => elm.authorId);
      const authors = [];
      const rating = [];
      for (let i = 0; i < authorsid.length; i++) {
        authors.push(await authorModel.findById(authorsid[i]));
      }

      for (let i = 0; i < reviews.length; i++) {
        const ratingsBook = await reviewModel.find({ bookId: books[i] });
        const arrRatings = ratingsBook.map((elm) => elm.rating);
        var ratingsSum = 0;
        arrRatings.forEach((elm) => {
          ratingsSum += elm;
        });
        let avgRating;
        if (arrRatings.length == 0) {
          avgRating = 0;
        } else {
          avgRating = ratingsSum / arrRatings.length;
        }
        rating.push(avgRating);
      }

      onebook = {
        book: "",
        authors: "",
        avg_rating: "",
      };
      mybook = [];

      for (let i = 0; i < authorsid.length; i++) {
        onebook = {
          book: reviews[i],
          authors: authors[i],
          avg_rating: rating[i],
        };

        mybook.push(await onebook);
      }
      res.send(mybook);
    } else if (state == "currently") {
      const reviews = await reviewModel
        .find({ userId: userid, status: "reading" })
        .populate("bookId");
      const books = await reviews.map((elm) => elm.bookId);
      const authorsid = await books.map((elm) => elm.authorId);
      const authors = [];
      const rating = [];
      for (let i = 0; i < authorsid.length; i++) {
        authors.push(await authorModel.findById(authorsid[i]));
      }

      for (let i = 0; i < reviews.length; i++) {
        const ratingsBook = await reviewModel.find({ bookId: books[i] });
        const arrRatings = ratingsBook.map((elm) => elm.rating);
        var ratingsSum = 0;
        arrRatings.forEach((elm) => {
          ratingsSum += elm;
        });
        let avgRating;
        if (arrRatings.length == 0) {
          avgRating = 0;
        } else {
          avgRating = ratingsSum / arrRatings.length;
        }
        rating.push(avgRating);
      }

      onebook = {
        book: "",
        authors: "",
        avg_rating: "",
      };
      mybook = [];

      for (let i = 0; i < authorsid.length; i++) {
        onebook = {
          book: reviews[i],
          authors: authors[i],
          avg_rating: rating[i],
        };

        mybook.push(await onebook);
      }
      res.send(mybook);
    } else {
      const reviews = await reviewModel.find({});
      res.send(reviews);
    }
  } catch (err) {
    res.send(err);
  }
});

//http://localhost:5000/reviews/:bookId
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bookReviews = await reviewModel
      .find({ bookId: id })
      .populate("userId");
    res.send(bookReviews);
  } catch (e) {
    res.send(e);
  }
});

//http://localhost:5000/reviews/:userId/:bookId
router.get("/:userId/:bookId", async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  try {
    const bookReviews = await reviewModel.findOne({
      bookId: bookId,
      userId: userId,
    });
    res.send(bookReviews);
  } catch (e) {
    res.send(e);
  }
});


router.post("/", auth, async (req, res) => {
  const review = new reviewModel(req.body);
  try {
    await review.save();
    res.send(review);
  } catch (e) {
    res.send(e);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    await reviewModel.findByIdAndUpdate(id, updatedData);
    res.send(updatedData);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const review = await reviewModel.findByIdAndDelete({ _id: id });
    res.send(review);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
