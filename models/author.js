const mongoose = require("mongoose");

const authorScehma = new mongoose.Schema({
  photo: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  description: { type: String, required: true },
});
const authorModel = mongoose.model("author", authorScehma);

module.exports = authorModel;
