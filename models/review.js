const mongoose = require("mongoose");

const reviewScehma = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  review: String,
  rating: Number,
  status: {
    type: String,
    enum: ["reading", "want to read", "read"],
    default: "reading",
  },
});

const reviewModel = mongoose.model("review", reviewScehma);

module.exports = reviewModel;
