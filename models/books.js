const mongoose = require("mongoose");

const bookScehma = new mongoose.Schema({
  title: String,
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
  image: String,
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
});

const bookModel = mongoose.model("book", bookScehma);

module.exports = bookModel;
