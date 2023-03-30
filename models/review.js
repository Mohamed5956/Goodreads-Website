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
  rating: { type: Number, default: 0 },
  review: { type: String, default: "" },
  Date  : { type:String},
  status: {
    type: String,
    enum: ["reading", "want to read", "readed"],
    default: "want to read",
  },
});

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = reviewModel;
