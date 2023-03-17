const mongoose = require("mongoose");

const bookScehma = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  image: String,
   reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
});

const bookModel = mongoose.model("book", bookScehma);

module.exports = bookModel;
