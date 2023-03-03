const mongoose = require("mongoose");

const categoryScehma = new mongoose.Schema({
  name: String,
});

const categoryModel = mongoose.model("category", categoryScehma);

module.exports = categoryModel;
