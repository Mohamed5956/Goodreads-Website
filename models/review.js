const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  rating: Number,
  review: String,
  status: {
    type: String,
    enum: ["reading", "want to read", "readed"],
    default: "reading",
  },
});

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = reviewModel;
