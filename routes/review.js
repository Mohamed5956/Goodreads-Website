const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const reviewModel = require("../models/review");

router.get("/", async (req, res) => {
  try {
    const reviews = await reviewModel.find({});
    res.send(reviews);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const review = await reviewModel.findById({ _id: id });
    res.send(review);
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

router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const review = await reviewModel.findByIdAndUpdate(id, updatedData);
    // console.log(review);
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
