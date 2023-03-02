const mongoose = require("mongoose");

const statusScehma = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
  status: { type: String, enum: ["want to read", "readed", "reading"] },
});

const statusModel = mongoose.model("status", statusScehma);

module.exports = statusModel;
