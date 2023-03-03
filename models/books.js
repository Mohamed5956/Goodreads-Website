const mongoose = require("mongoose");

const bookScehma = new mongoose.Schema({
  title: String,
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
  ratingId: { type: mongoose.Schema.Types.ObjectId, ref: "rating" },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
  image: String,
  status: { type: mongoose.Schema.Types.ObjectId, ref: "status" },
});

const bookModel = mongoose.model("book", bookScehma);

module.exports = bookModel;
