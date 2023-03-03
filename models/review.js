const mongoose = require("mongoose");

const reviewScehma = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
  review: String,
});

const reviewModel = mongoose.model("review", reviewScehma);

module.exports = reviewModel;
