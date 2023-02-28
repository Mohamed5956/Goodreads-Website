const mongoose = require("mongoose");

const bookScehma = new mongoose.Schema({
  title: String,
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  author: String,
  ratings: { type: mongoose.Schema.Types.ObjectId, ref: "ratings" },
  reviews: { type: mongoose.Schema.Types.ObjectId, ref: "reviews" },
  image: String,
});

const bookModel = mongoose.model("book", bookScehma);

module.exports = bookModel;
