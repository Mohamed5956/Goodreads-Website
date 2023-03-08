const mongoose = require("mongoose");

const authorScehma = new mongoose.Schema({
  photo: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  description: String,
});
const authorModel = mongoose.model("author", authorScehma);

module.exports = authorModel;
