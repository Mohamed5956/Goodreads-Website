const mongoose = require("mongoose");

const categoryScehma = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const categoryModel = mongoose.model("category", categoryScehma);

module.exports = categoryModel;
