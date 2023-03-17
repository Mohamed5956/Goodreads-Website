const { json } = require("express");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const reviewModel = require("../models/review");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ratingsBook = await reviewModel.find({ bookId: id });
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
        avg: avgRating,
        count: arrRatings.length,
      };
      rateObj = JSON.stringify(rateObj);
      res.send(`${rateObj}`);

  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
