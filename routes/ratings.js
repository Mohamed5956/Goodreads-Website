const { json } = require("express");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const reviewModel = require("../models/review");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ratingsbook = await reviewModel.find({ bookId: id });
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const ratings = ratingsbook.map((elm) => elm.rating);
    var ratingsSum = 0;
    ratings.forEach((elm) => {
      ratingsSum += elm;
    });
    const sum = ratingsSum / ratings.length;
    // console.log(sum);
    res.send(`${sum}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
